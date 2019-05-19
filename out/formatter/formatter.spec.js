"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("./formatter");
const chai = require("chai");
const lexxer_1 = require("./lexxer");
describe('formatter', () => {
    it('should not change anything', () => {
        const text = '<div></div>';
        chai.expect(new formatter_1.Formatter(new lexxer_1.Lexxer(text), []).format()).to.equal(text);
    });
    it('should order the attributes', () => {
        const text = '<div b="a" a="b"></div>';
        const expected = '<div a="b" b="a"></div>';
        chai.expect(new formatter_1.Formatter(new lexxer_1.Lexxer(text), []).format()).to.equal(expected);
    });
    it('should work with brackets / parantheses attributes', () => {
        let text = '<div [b]="a" a="b"></div>';
        let expected = '<div a="b" [b]="a"></div>';
        chai.expect(new formatter_1.Formatter(new lexxer_1.Lexxer(text), []).format()).to.equal(expected);
        text = '<div [(b)]="a" a="b"></div>';
        expected = '<div a="b" [(b)]="a"></div>';
        chai.expect(new formatter_1.Formatter(new lexxer_1.Lexxer(text), []).format()).to.equal(expected);
        text = '<div @b="a" a="b"></div>';
        expected = '<div a="b" @b="a"></div>';
        chai.expect(new formatter_1.Formatter(new lexxer_1.Lexxer(text), []).format()).to.equal(expected);
    });
});
//# sourceMappingURL=formatter.spec.js.map