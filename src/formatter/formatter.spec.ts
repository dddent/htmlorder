import { Formatter } from './formatter';
import * as chai from 'chai';
import { Lexxer } from './lexxer';

describe('formatter', () => {
  it('should not change anything', () => {
    const text = '<div></div>';
    chai.expect(new Formatter(new Lexxer(text), []).format()).to.equal(text);
  });

  it('should order the attributes', () => {
    const text = '<div b="a" a="b"></div>';
    const expected = '<div a="b" b="a"></div>';
    chai.expect(new Formatter(new Lexxer(text), []).format()).to.equal(expected);
  });

  it('should work with brackets / parantheses attributes', () => {
    let text = '<div [b]="a" a="b"></div>';
    let expected = '<div a="b" [b]="a"></div>';
    chai.expect(new Formatter(new Lexxer(text), []).format()).to.equal(expected);

    text = '<div [(b)]="a" a="b"></div>';
    expected = '<div a="b" [(b)]="a"></div>';
    chai.expect(new Formatter(new Lexxer(text), []).format()).to.equal(expected);

    text = '<div @b="a" a="b"></div>';
    expected = '<div a="b" @b="a"></div>';
    chai.expect(new Formatter(new Lexxer(text), []).format()).to.equal(expected);
  });
});