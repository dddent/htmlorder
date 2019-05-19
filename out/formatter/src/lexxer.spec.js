"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const lexxer_1 = require("./lexxer");
const tokens_1 = require("./tokens");
describe('lexxer', () => {
    it('should scan the correct tokens', () => {
        const test = '<div asd="asd"></div>';
        const l = new lexxer_1.Lexxer(test);
        const tokens = l.all();
        chai.expect(tokens.map((t) => tokens_1.TokenKind[t.kind])).to.eql([
            tokens_1.TokenKind[tokens_1.TokenKind.SmallerThan],
            tokens_1.TokenKind[tokens_1.TokenKind.Identifier],
            tokens_1.TokenKind[tokens_1.TokenKind.Whitespace],
            tokens_1.TokenKind[tokens_1.TokenKind.Identifier],
            tokens_1.TokenKind[tokens_1.TokenKind.Equals],
            tokens_1.TokenKind[tokens_1.TokenKind.String],
            tokens_1.TokenKind[tokens_1.TokenKind.GreaterThan],
            tokens_1.TokenKind[tokens_1.TokenKind.SmallerThan],
            tokens_1.TokenKind[tokens_1.TokenKind.ForwardSlash],
            tokens_1.TokenKind[tokens_1.TokenKind.Identifier],
            tokens_1.TokenKind[tokens_1.TokenKind.GreaterThan]
        ]);
    });
});
//# sourceMappingURL=lexxer.spec.js.map