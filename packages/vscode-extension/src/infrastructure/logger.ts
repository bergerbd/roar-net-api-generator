import * as vscode from "vscode";

import type { Logger } from "../core/logger";

export class VsCodeLogger implements Logger {
  private readonly channel: vscode.OutputChannel;

  constructor(channelName: string) {
    this.channel = vscode.window.createOutputChannel(channelName);
  }

  info(message: string): void {
    this.channel.appendLine(message);
  }
}
