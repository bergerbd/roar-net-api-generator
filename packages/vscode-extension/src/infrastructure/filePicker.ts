import * as vscode from "vscode";

export interface FilePicker {
  pickFile(
    defaultDir: string,
    filters?: Record<string, string[]>,
  ): Promise<string | undefined>;
  pickFolder(defaultDir: string): Promise<string | undefined>;
}

export class VsCodeFilePicker implements FilePicker {
  async pickFile(
    defaultDir: string,
    filters?: Record<string, string[]>,
  ): Promise<string | undefined> {
    const result = await vscode.window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      defaultUri: vscode.Uri.file(defaultDir),
      ...(filters ? { filters } : {}),
    });
    return result?.[0]?.fsPath;
  }

  async pickFolder(defaultDir: string): Promise<string | undefined> {
    const result = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      defaultUri: vscode.Uri.file(defaultDir),
    });
    return result?.[0]?.fsPath;
  }
}
