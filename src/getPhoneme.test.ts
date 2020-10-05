import getPhoneme from './getPhoneme';

const data = [
  ['ㄱ', ['ㄱ', '', '']],
  ['가', ['ㄱ', 'ㅏ', '']],
  ['각', ['ㄱ', 'ㅏ', 'ㄱ']],
  ['ㅎ', ['ㅎ', '', '']],
  ['히', ['ㅎ', 'ㅣ', '']],
  ['힣', ['ㅎ', 'ㅣ', 'ㅎ']],
  ['뷁', ['ㅂ', 'ㅞ', 'ㄺ']],
];

describe('getPhoneme', () => {
  data.forEach(([char, [initial, medial, finale]]: any) => {
    test(`getPhoneme '${char}'`, () => {
      const phoneme = getPhoneme(char);
      expect(phoneme.initial).toBe(initial);
      expect(phoneme.medial).toBe(medial);
      expect(phoneme.finale).toBe(finale);
    });
  });
});
