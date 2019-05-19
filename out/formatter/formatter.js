"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
class Formatter {
    constructor(l, order) {
        this.l = l;
        this.res = order.map((o) => new RegExp('^' + o + '$'));
    }
    skipWhitespace() {
        let peek = this.l.peek();
        let ws = '';
        while (peek && peek.kind === tokens_1.TokenKind.Whitespace) {
            ws += peek.value;
            this.l.next();
            peek = this.l.peek();
        }
        return ws;
    }
    formatTag() {
        let peek = this.l.peek();
        if (!peek || peek.kind !== tokens_1.TokenKind.SmallerThan) {
            return this.format();
        }
        this.l.next();
        peek = this.l.peek();
        if (!peek || peek.kind !== tokens_1.TokenKind.Identifier) {
            return '<' + this.format();
        }
        let name = peek.value;
        this.l.next();
        let res = '<' + name;
        const attrs = [];
        while (true) {
            const attr = { name: '', val: '' };
            attr.val += this.skipWhitespace();
            peek = this.l.peek();
            while (peek && peek.kind !== tokens_1.TokenKind.GreaterThan && peek.kind !== tokens_1.TokenKind.Identifier) {
                attr.val += peek.value;
                this.l.next();
                peek = this.l.peek();
            }
            if (!peek || peek.kind === tokens_1.TokenKind.GreaterThan) {
                break;
            }
            attr.name = peek.value;
            attr.val += peek.value;
            this.l.next();
            attr.val += this.skipWhitespace();
            peek = this.l.peek();
            while (peek && peek.kind !== tokens_1.TokenKind.Equals && peek.kind !== tokens_1.TokenKind.GreaterThan) {
                attr.val += peek.value;
                this.l.next();
                peek = this.l.peek();
            }
            if (!peek || peek.kind === tokens_1.TokenKind.GreaterThan) {
                break;
            }
            if (!peek || peek.kind !== tokens_1.TokenKind.Equals) {
                continue;
            }
            attr.val += '=';
            this.l.next();
            attr.val += this.skipWhitespace();
            peek = this.l.peek();
            if (!peek || peek.kind !== tokens_1.TokenKind.String) {
                continue;
            }
            attr.val += peek.value;
            attrs.push(attr);
            this.l.next();
        }
        for (const a of this.orderAttrs(attrs)) {
            res += a.val;
        }
        return res + this.format();
    }
    orderAttrs(attrs) {
        for (const attr of attrs) {
            for (let i = 0; i < this.res.length; ++i) {
                if (this.res[i].test(attr.name)) {
                    attr.index = i + 1;
                    break;
                }
            }
        }
        return attrs.sort((a, b) => {
            if (a.index) {
                if (!b.index) {
                    return -1;
                }
                return a.index - b.index;
            }
            if (b.index) {
                return 1;
            }
            return a.name < b.name ? -1 : 1;
        });
    }
    format() {
        let peek = this.l.peek();
        if (!peek) {
            return '';
        }
        if (peek.kind === tokens_1.TokenKind.SmallerThan) {
            return this.formatTag() + this.format();
        }
        this.l.next();
        return peek.value + this.format();
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=formatter.js.map