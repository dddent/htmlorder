import { Lexxer } from './lexxer';
import { TokenKind } from './tokens';

export class Formatter {
  private res: RegExp[];

  constructor(private l: Lexxer, order: string[]) {
    this.res = order.map((o) => new RegExp('^' + o + '$'));
  }

  private skipWhitespace() {
    let peek = this.l.peek();
    let ws = '';
    while (peek && peek.kind === TokenKind.Whitespace) {
      ws += peek.value;
      this.l.next();
      peek = this.l.peek();
    }
    return ws;
  }

  private formatTag(): string {
    let peek = this.l.peek();
    if (!peek || peek.kind !== TokenKind.SmallerThan) {
      return this.format();
    }
    this.l.next();
    peek = this.l.peek();
    if (!peek || peek.kind !== TokenKind.Identifier) {
      return '<' + this.format();
    }
    let name = peek.value;
    this.l.next();
    let res = '<' + name;
    const attrs: { name: string, val: string }[] = [];
    while (true) {
      const attr = { name: '', val: '' };
      attr.val += this.skipWhitespace();
      peek = this.l.peek();
      while (peek && peek.kind !== TokenKind.GreaterThan && peek.kind !== TokenKind.Identifier) {
        attr.val += peek.value;
        this.l.next();
        peek = this.l.peek();
      }
      if (!peek || peek.kind === TokenKind.GreaterThan) {
        break;
      }
      attr.name = peek.value;
      attr.val += peek.value;
      this.l.next();
      attr.val += this.skipWhitespace();
      peek = this.l.peek();
      while (peek && peek.kind !== TokenKind.Equals && peek.kind !== TokenKind.GreaterThan) {
        attr.val += peek.value;
        this.l.next();
        peek = this.l.peek();
      }
      if (!peek || peek.kind === TokenKind.GreaterThan) {
        break;
      }
      if (!peek || peek.kind !== TokenKind.Equals) {
        continue;
      }
      attr.val += '=';
      this.l.next();
      attr.val += this.skipWhitespace();
      peek = this.l.peek();
      if (!peek || peek.kind !== TokenKind.String) {
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

  private orderAttrs(attrs: { name: string, val: string, index?: number }[]) {
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

  public format(): string {
    let peek = this.l.peek();
    if (!peek) {
      return '';
    }
    if (peek.kind === TokenKind.SmallerThan) {
      return this.formatTag() + this.format();
    }
    this.l.next();
    return peek.value + this.format();
  }
}