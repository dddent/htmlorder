"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
class Lexxer {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.peekToken = null;
        this.next();
    }
    all() {
        const res = [];
        let t;
        while (t = this.next()) {
            res.push(t);
        }
        return res;
    }
    next() {
        const res = this.peekToken;
        this.peekToken = this._advance();
        return res;
    }
    peek() {
        return this.peekToken;
    }
    _advance() {
        if (this.pos >= this.text.length) {
            return null;
        }
        if (tokens_1.singleCharTokens[this.text[this.pos]]) {
            return new tokens_1.Token(tokens_1.singleCharTokens[this.text[this.pos]], this.text[this.pos++]);
        }
        if (/[a-zA-Z]/.test(this.text[this.pos])) {
            let val = '';
            do {
                val += this.text[this.pos++];
            } while (/[a-zA-Z]/.test(this.text[this.pos]));
            return new tokens_1.Token(tokens_1.TokenKind.Identifier, val);
        }
        if (this.text[this.pos] === '"') {
            let val = '';
            do {
                val += this.text[this.pos++];
            } while (this.text[this.pos] && this.text[this.pos] !== '"');
            val += this.text[this.pos++];
            return new tokens_1.Token(tokens_1.TokenKind.String, val);
        }
        if (this.text[this.pos] === ' ' || this.text[this.pos] === '\t' || this.text[this.pos] === '\n') {
            return new tokens_1.Token(tokens_1.TokenKind.Whitespace, this.text[this.pos++]);
        }
        const tok = new tokens_1.Token(tokens_1.TokenKind.Unknown, this.text[this.pos]);
        this.pos++;
        return tok;
    }
}
exports.Lexxer = Lexxer;
//# sourceMappingURL=lexxer.js.map