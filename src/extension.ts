import * as vscode from "vscode";
import Cache from "vscode-cache";
import axios, { AxiosResponse } from "axios";

async function cacheWrapper(
  cache: Cache,
  command: Function,
  component: string
) {
  const cacheKey = `${vscode.workspace.name || "...last"}.${component}`;
  const cachedValue = cache.get(cacheKey);

  const newValue = await command(cachedValue);
  if (newValue === "") {
    return;
  }

  await cache.put(cacheKey, newValue);
  await cache.put("...last", newValue);
}

async function resetHook(token: string): Promise<AxiosResponse<any>> {
  const link = `https://api.telegram.org/bot${token}/getUpdates?offset=-1`;
  try {
    return await axios.get(link);
  } catch (err) {
    return err.response;
  }
}

async function resetHookInteraction(cachedToken: string): Promise<string> {
  const token = await vscode.window.showInputBox({ value: cachedToken, prompt: "Enter your Telegram bot api key" });
  if (token === undefined) {
    return new Promise(r => r(""));
  }

  const response = await resetHook(token);
  const message = response.data.ok
    ? "Success! Hook was reset successfully."
    : `Fail! Telegram said: ${response.data.description}`;

  vscode.window.showInformationMessage(message);

  return new Promise(r => r(token));
}

export function activate(context: vscode.ExtensionContext) {
  const cache = new Cache(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.resetHook", async () =>
      cacheWrapper(cache, resetHookInteraction, "reset_hook.apikey")
    )
  );
}

export function deactivate() {}
