import * as vscode from "vscode";
import { VsCodeFilePicker } from "./infrastructure/filePicker";
import {
  ProjectConfigEditorProvider,
  PROJECT_CONFIG_VIEW_TYPE,
} from "./editors/projectConfigEditorProvider";

export function activate(context: vscode.ExtensionContext): void {
  const projectConfigEditor = vscode.window.registerCustomEditorProvider(
    PROJECT_CONFIG_VIEW_TYPE,
    new ProjectConfigEditorProvider(
      context.extensionUri,
      new VsCodeFilePicker(),
    ),
    {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: false,
    },
  );

  context.subscriptions.push(projectConfigEditor);
}

export function deactivate(): void {
  // No cleanup needed: context.subscriptions disposes all registered
  // commands and listeners automatically.
}
