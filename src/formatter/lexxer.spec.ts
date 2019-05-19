import * as chai from 'chai';
import { Lexxer } from './lexxer';
import { TokenKind } from './tokens';

describe('lexxer', () => {
  it('should scan the correct tokens', () => {
    const test = '<div asd="asd"></div>';
    const l = new Lexxer(test);
    const tokens = l.all();
    chai.expect(tokens.map((t) => TokenKind[t.kind])).to.eql([
      TokenKind[TokenKind.SmallerThan],
      TokenKind[TokenKind.Identifier],
      TokenKind[TokenKind.Whitespace],
      TokenKind[TokenKind.Identifier],
      TokenKind[TokenKind.Equals],
      TokenKind[TokenKind.String],
      TokenKind[TokenKind.GreaterThan],
      TokenKind[TokenKind.SmallerThan],
      TokenKind[TokenKind.ForwardSlash],
      TokenKind[TokenKind.Identifier],
      TokenKind[TokenKind.GreaterThan]
    ])
  });
});