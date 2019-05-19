"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const formatter_1 = require("./formatter/formatter");
const lexxer_1 = require("./formatter/lexxer");
let order = null;
let formatter = null;
function getOrderConfig() {
    if (order) {
        return order;
    }
    let o = vscode.workspace.getConfiguration('orderattr').get('order');
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
    formatter = new formatter_1.Formatter(new lexxer_1.Lexxer(doc.getText()), getOrderConfig());
    const newText = formatter.format();
    editor.edit((e) => {
        const range = new vscode.Range(new vscode.Position(0, 0), doc.positionAt(doc.getText().length));
        e.replace(range, newText);
    });
}
function activate(context) {
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
exports.activate = activate;
//# sourceMappingURL=extension.js.map