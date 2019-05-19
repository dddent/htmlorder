import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { Formatter } from './formatter/formatter';
import { Lexxer } from './formatter/lexxer';

let order: string[] | null = null;
let formatter: Formatter | null = null;

function getOrderConfig() {
  if (order) {
    return order;
  }
  let o = vscode.workspace.getConfiguration('orderattr').get<string[]>('order');
  if (!o) {
    o = [];
  }
  return order = o;
}

function orderCurrentDoc() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const doc = editor.document;
  formatter = new Formatter(new Lexxer(doc.getText()), getOrderConfig());
  const newText = formatter.format();
  editor.edit((e) => {
    const range = new vscode.Range(
      new vscode.Position(0, 0),
      doc.positionAt(doc.getText().length)
    );
    e.replace(range, newText);
  });
}

export function activate(context: ExtensionContext) {
  vscode.workspace.onDidChangeConfiguration(() => {
    order = null;
    formatter = null;
  });

  vscode.commands.registerCommand('htmlorder.order', () => {
    orderCurrentDoc();
  });

  vscode.workspace.onWillSaveTextDocument((e) => {
    const enabled = vscode.workspace.getConfiguration('orderattr').get('orderOnSave');
    if (!enabled) {
      return;
    }
    orderCurrentDoc();
  });
}