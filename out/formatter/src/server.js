"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
// create the connection
const connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
// create a document manager
const documents = new vscode_languageserver_1.TextDocuments();
documents.listen(connection);
let capabilities = {
    configuration: false
};
connection.onInitialize((params) => {
    // here we check what capabilities the client has
    capabilities.configuration = !!params.capabilities.workspace && !!params.capabilities.workspace.configuration;
    // and respond with what capabilities we support
    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            documentFormattingProvider: true
        }
    };
});
connection.onInitialized(() => {
    // here we can initialize listeners for changes in the client
    // (e.g. changes of configuration or workspace folder)
});
const defaultSettings = {};
let globalSettings = defaultSettings;
// settings cached for each open document
let documentSettings = new Map();
connection.onDidChangeConfiguration((change) => {
    // if we rely on configuration, we need to reapply the settings here and
    // reevaluate the files
});
function getDocumentSettings(resource) {
    if (!capabilities.configuration) {
        // if configuration is not supportes, always return defaults
        return Promise.resolve(globalSettings);
    }
    let res = documentSettings.get(resource);
    if (!res) {
        // if we do not have the configuration for the resource yet, we load it
        res = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'html-order-attr'
        });
        documentSettings.set(resource, res);
    }
    return res;
}
documents.onDidClose((e) => documentSettings.delete(e.document.uri));
connection.onDocumentFormatting((params) => {
    const doc = documents.get(params.textDocument.uri);
    if (!doc) {
        return [];
    }
    const text = doc.getText();
    const editRange = vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(0, 0), doc.positionAt(doc.getText().length));
    return [vscode_languageserver_1.TextEdit.replace(editRange, text)];
});
//# sourceMappingURL=server.js.map