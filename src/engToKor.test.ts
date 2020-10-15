import engToKor from './engToKor';

describe('engToKor', () => {
  [
    ['gksrmfskf', '한글날'],
    ['Rkrenrl, xhdekfr', '깍두기, 통닭'],
  ].forEach(([before, after]: any) => {
    test(`engToKor '${before}' → '${after}'`, () => {
      expect(engToKor(before)).toBe(after);
    });
  });
});
