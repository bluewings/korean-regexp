import implode from './implode';

describe('implode', () => {
  [
    ['ㄲㅏㄱㄷㅜㄱㅣ', '깍두기'],
    ['ㅂㅜㄹㄷㅏㄹㄱ', '불닭'],
    [['ㅂ', 'ㅜ', 'ㄹ', 'ㄷ', 'ㅏ', 'ㄹ', 'ㄱ'], '불닭'],
    [
      [
        ['ㅂ', 'ㅜ', 'ㄹ'],
        ['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ'],
      ],
      '불닭',
    ],
  ].forEach(([hints, text]: any) => {
    test(`implode '${hints}' → '${text}'`, () => {
      expect(implode(hints)).toBe(text);
    });
  });
});
