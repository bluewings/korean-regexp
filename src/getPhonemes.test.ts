import getPhonemes from './getPhonemes';

describe('getPhonemes', () => {
  [
    ['ㄱ', ['ㄱ', '', '']],
    ['가', ['ㄱ', 'ㅏ', '']],
    ['각', ['ㄱ', 'ㅏ', 'ㄱ']],
    ['ㅎ', ['ㅎ', '', '']],
    ['히', ['ㅎ', 'ㅣ', '']],
    ['힣', ['ㅎ', 'ㅣ', 'ㅎ']],
    ['뷁', ['ㅂ', 'ㅞ', 'ㄺ']],
  ].forEach(([char, [initial, medial, finale]]: any) => {
    test(`getPhonemes '${char}' → '${initial}', '${medial}', '${finale}'`, () => {
      const phonemes = getPhonemes(char);
      expect(phonemes.initial).toBe(initial);
      expect(phonemes.medial).toBe(medial);
      expect(phonemes.finale).toBe(finale);
    });
  });
});
