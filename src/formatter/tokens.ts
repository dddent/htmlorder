export enum TokenKind {
  Unknown,
  SmallerThan,
  GreaterThan,
  Equals,
  Identifier,
  String,
  Whitespace,
  ForwardSlash
}

export const singleCharTokens: { [char: string]: TokenKind } = {
  '<': TokenKind.SmallerThan,
  '>': TokenKind.GreaterThan,
  '=': TokenKind.Equals,
  '/': TokenKind.ForwardSlash,
}

export class Token {
  constructor(public kind: TokenKind, public value: string) { }
  toString() {
    return '[' + TokenKind[this.kind] + ' ' + this.value + ']';
  }
}