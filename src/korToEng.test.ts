import korToEng from './korToEng';

describe('korToEng', () => {
  [
    ['ㅗ디ㅣㅐ 재깅!', 'hello world!'],
    ['ㅠㅁ차 새 솓 려셕ㄷ', 'back to the future'],
  ].forEach(([before, after]: any) => {
    test(`korToEng '${before}' → '${after}'`, () => {
      expect(korToEng(before)).toBe(after);
    });
  });
});
