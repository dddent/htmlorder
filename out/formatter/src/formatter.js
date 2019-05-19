"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
class Formatter {
    static skipWhitespace(l) {
        let peek = l.peek();
        let ws = '';
        while (peek && peek.kind === tokens_1.TokenKind.Whitespace) {
            ws += peek.value;
            l.next();
            peek = l.peek();
        }
        return ws;
    }
    static formatTag(l) {
        let peek = l.peek();
        if (!peek || peek.kind !== tokens_1.TokenKind.SmallerThan) {
            return this.format(l);
        }
        l.next();
        peek = l.peek();
        if (!peek || peek.kind !== tokens_1.TokenKind.Identifier) {
            return '<' + this.format(l);
        }
        let name = peek.value;
        l.next();
        let res = '<' + name;
        const attrs = [];
        while (true) {
            const attr = { name: '', val: '' };
            attr.val += this.skipWhitespace(l);
            peek = l.peek();
            while (peek && peek.kind !== tokens_1.TokenKind.GreaterThan && peek.kind !== tokens_1.TokenKind.Identifier) {
                attr.val += peek.value;
                l.next();
                peek = l.peek();
            }
            if (!peek || peek.kind === tokens_1.TokenKind.GreaterThan) {
                break;
            }
            attr.name = peek.value;
            attr.val += peek.value;
            l.next();
            attr.val += this.skipWhitespace(l);
            peek = l.peek();
            while (peek && peek.kind !== tokens_1.TokenKind.Equals && peek.kind !== tokens_1.TokenKind.GreaterThan) {
                attr.val += peek.value;
                l.next();
                peek = l.peek();
            }
            if (!peek || peek.kind === tokens_1.TokenKind.GreaterThan) {
                break;
            }
            if (!peek || peek.kind !== tokens_1.TokenKind.Equals) {
                continue;
            }
            attr.val += '=';
            l.next();
            attr.val += this.skipWhitespace(l);
            peek = l.peek();
            if (!peek || peek.kind !== tokens_1.TokenKind.String) {
                continue;
            }
            attr.val += peek.value;
            attrs.push(attr);
            l.next();
        }
        for (const a of attrs.sort((a, b) => a.name < b.name ? -1 : 1)) {
            res += a.val;
        }
        return res + this.format(l);
    }
    static format(l) {
        let peek = l.peek();
        if (!peek) {
            return '';
        }
        if (peek.kind === tokens_1.TokenKind.SmallerThan) {
            return this.formatTag(l) + this.format(l);
        }
        l.next();
        return peek.value + this.format(l);
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=formatter.js.map