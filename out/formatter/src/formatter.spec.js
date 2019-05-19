"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("./formatter");
const chai = require("chai");
const lexxer_1 = require("./lexxer");
describe('formatter', () => {
    it('should not change anything', () => {
        const text = '<div></div>';
        chai.expect(formatter_1.Formatter.format(new lexxer_1.Lexxer(text))).to.equal(text);
    });
    it('should order the attributes', () => {
        const text = '<div b="a" a="b"></div>';
        const expected = '<div a="b" b="a"></div>';
        chai.expect(formatter_1.Formatter.format(new lexxer_1.Lexxer(text))).to.equal(expected);
    });
    it('should work with brackets / parantheses attributes', () => {
        let text = '<div [b]="a" a="b"></div>';
        let expected = '<div a="b" [b]="a"></div>';
        chai.expect(formatter_1.Formatter.format(new lexxer_1.Lexxer(text))).to.equal(expected);
        text = '<div [(b)]="a" a="b"></div>';
        expected = '<div a="b" [(b)]="a"></div>';
        chai.expect(formatter_1.Formatter.format(new lexxer_1.Lexxer(text))).to.equal(expected);
        text = '<div @b="a" a="b"></div>';
        expected = '<div a="b" @b="a"></div>';
        chai.expect(formatter_1.Formatter.format(new lexxer_1.Lexxer(text))).to.equal(expected);
    });
});
//# sourceMappingURL=formatter.spec.js.map