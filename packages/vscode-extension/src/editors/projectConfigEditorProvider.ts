import * as path from "node:path";
import * as crypto from "node:crypto";
import * as vscode from "vscode";

import {
  parseProjectConfig,
  serializeProjectConfig,
  ProjectConfigParseError,
  type ProjectConfig,
} from "../core/projectConfig";
import { toAbsolutePath, toRelativePortablePath } from "../core/paths";
import type { FilePicker } from "../infrastructure/filePicker";
import { VsCodeLogger } from "../infrastructure/logger";
import { generateCode } from "../core/generator";

type WebviewToExtensionMessage =
  | { type: "edit"; config: ProjectConfig }
  | { type: "pickFile"; field: string; currentValue: string }
  | { type: "pickFolder"; field: string; currentValue: string }
  | { type: "execute" };

type ExtensionToWebviewMessage =
  | { type: "update"; config: ProjectConfig }
  | { type: "parseError"; message: string }
  | { type: "pickResult"; field: string; value: string };

export const PROJECT_CONFIG_VIEW_TYPE = "roarNetGenerator.projectConfig";

export class ProjectConfigEditorProvider
  implements vscode.CustomTextEditorProvider
{
  private readonly logger = new VsCodeLogger("ROAR-NET Generator");

  constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly filePicker: FilePicker,
  ) {}

  resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken,
  ): void {
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, "dist")],
    };
    webviewPanel.webview.html = this.getHtml(webviewPanel.webview);

    const configDir = path.dirname(document.uri.fsPath);

    const postUpdate = (): void => {
      try {
        const config = parseProjectConfig(document.getText());
        this.postMessage(webviewPanel, { type: "update", config });
      } catch (err) {
        const message =
          err instanceof ProjectConfigParseError ? err.message : String(err);
        this.postMessage(webviewPanel, { type: "parseError", message });
      }
    };

    const changeSubscription = vscode.workspace.onDidChangeTextDocument(
      (event) => {
        if (event.document.uri.toString() === document.uri.toString()) {
          postUpdate();
        }
      },
    );
    webviewPanel.onDidDispose(() => {
      changeSubscription.dispose();
    });

    webviewPanel.webview.onDidReceiveMessage(
      (message: WebviewToExtensionMessage) => {
        void this.handleMessage(message, document, configDir, webviewPanel);
      },
    );

    postUpdate();
  }

  private async handleMessage(
    message: WebviewToExtensionMessage,
    document: vscode.TextDocument,
    configDir: string,
    webviewPanel: vscode.WebviewPanel,
  ): Promise<void> {
    switch (message.type) {
      case "edit": {
        await this.applyConfigToDocument(document, message.config);
        return;
      }
      case "pickFile": {
        const defaultDir = toAbsolutePath(
          configDir,
          path.dirname(message.currentValue || "."),
        );
        const picked = await this.filePicker.pickFile(defaultDir);
        if (picked) {
          const relative = toRelativePortablePath(configDir, picked);
          this.postMessage(webviewPanel, {
            type: "pickResult",
            field: message.field,
            value: relative,
          });
        }
        return;
      }
      case "pickFolder": {
        const defaultDir = toAbsolutePath(
          configDir,
          message.currentValue || ".",
        );
        const picked = await this.filePicker.pickFolder(defaultDir);
        if (picked) {
          const relative = toRelativePortablePath(configDir, picked);
          this.postMessage(webviewPanel, {
            type: "pickResult",
            field: message.field,
            value: relative,
          });
        }
        return;
      }

      case "execute": {
        // save document
        await document.save();

        try {
          const config = parseProjectConfig(document.getText());
          const rootDir = path.dirname(document.uri.fsPath);

          await generateCode(rootDir, config, this.logger);
          void vscode.window.showInformationMessage("Finished generation.");
        } catch (err) {
          void vscode.window.showErrorMessage(`Error: ${String(err)}`);
        }
        return;
      }
    }
  }

  /**
   * Replace document content.
   */
  private async applyConfigToDocument(
    document: vscode.TextDocument,
    config: ProjectConfig,
  ): Promise<void> {
    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
    edit.replace(document.uri, fullRange, serializeProjectConfig(config));
    await vscode.workspace.applyEdit(edit);
  }

  private postMessage(
    webviewPanel: vscode.WebviewPanel,
    message: ExtensionToWebviewMessage,
  ): void {
    void webviewPanel.webview.postMessage(message);
  }

  private getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "dist", "webview", "main.js"),
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "dist", "webview", "main.css"),
    );
    const nonce = crypto.randomBytes(16).toString("base64");

    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
  <link href="${styleUri.toString()}" rel="stylesheet" />
  <title>ROAR-NET project configuration</title>
</head>
<body>
  <div id="app"></div>
  <script nonce="${nonce}" src="${scriptUri.toString()}"></script>
</body>
</html>`;
  }
}
