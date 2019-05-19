import { Token, singleCharTokens, TokenKind } from './tokens';

export class Lexxer {
  private pos = 0;
  private peekToken: Token | null = null;

  constructor(private text: string) {
    this.next();
  }

  all() {
    const res: Token[] = [];
    let t: Token | null;
    while (t = this.next()) {
      res.push(t);
    }
    return res;
  }

  next(): Token | null {
    const res = this.peekToken;
    this.peekToken = this._advance();
    return res;
  }

  peek() {
    return this.peekToken;
  }

  private _advance(): Token | null {
    if (this.pos >= this.text.length) {
      return null;
    }
    if (singleCharTokens[this.text[this.pos]]) {
      return new Token(singleCharTokens[this.text[this.pos]], this.text[this.pos++]);
    }
    if (/[a-zA-Z]/.test(this.text[this.pos])) {
      let val = '';
      do {
        val += this.text[this.pos++];
      } while (/[a-zA-Z]/.test(this.text[this.pos]));
      return new Token(TokenKind.Identifier, val);
    }
    if (this.text[this.pos] === '"') {
      let val = '';
      do {
        val += this.text[this.pos++];
      } while (this.text[this.pos] && this.text[this.pos] !== '"');
      val += this.text[this.pos++];
      return new Token(TokenKind.String, val);
    }
    if (this.text[this.pos] === ' ' || this.text[this.pos] === '\t' || this.text[this.pos] === '\n') {
      return new Token(TokenKind.Whitespace, this.text[this.pos++]);
    }
    const tok = new Token(TokenKind.Unknown, this.text[this.pos]);
    this.pos++;
    return tok;
  }
}