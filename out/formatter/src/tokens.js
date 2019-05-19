"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenKind;
(function (TokenKind) {
    TokenKind[TokenKind["Unknown"] = 0] = "Unknown";
    TokenKind[TokenKind["SmallerThan"] = 1] = "SmallerThan";
    TokenKind[TokenKind["GreaterThan"] = 2] = "GreaterThan";
    TokenKind[TokenKind["Equals"] = 3] = "Equals";
    TokenKind[TokenKind["Identifier"] = 4] = "Identifier";
    TokenKind[TokenKind["String"] = 5] = "String";
    TokenKind[TokenKind["Whitespace"] = 6] = "Whitespace";
    TokenKind[TokenKind["ForwardSlash"] = 7] = "ForwardSlash";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
exports.singleCharTokens = {
    '<': TokenKind.SmallerThan,
    '>': TokenKind.GreaterThan,
    '=': TokenKind.Equals,
    '/': TokenKind.ForwardSlash,
};
class Token {
    constructor(kind, value) {
        this.kind = kind;
        this.value = value;
    }
    toString() {
        return '[' + TokenKind[this.kind] + ' ' + this.value + ']';
    }
}
exports.Token = Token;
//# sourceMappingURL=tokens.js.map