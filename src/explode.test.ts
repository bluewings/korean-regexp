import explode from './explode';

const { stringify } = JSON;

describe('explode', () => {
  [
    ['깍두기', ['ㄲ', 'ㅏ', 'ㄱ', 'ㄷ', 'ㅜ', 'ㄱ', 'ㅣ']],
    ['불닭', ['ㅂ', 'ㅜ', 'ㄹ', 'ㄷ', 'ㅏ', 'ㄹ', 'ㄱ']],
  ].forEach(([text, items]: any) => {
    test(`explode '${text}' → '${items}'`, () => {
      expect(stringify(explode(text))).toBe(stringify(items));
    });
  });
});

describe('options.grouped', () => {
  test('grouped: false (default)', () => {
    expect(stringify(explode('불닭'))).toBe(stringify(explode('불닭', { grouped: false })));
    expect(stringify(explode('불닭', { grouped: false }))).toBe(stringify(['ㅂ', 'ㅜ', 'ㄹ', 'ㄷ', 'ㅏ', 'ㄹ', 'ㄱ']));
  });
  test('grouped: true', () => {
    expect(stringify(explode('불닭', { grouped: true }))).toBe(
      stringify([
        ['ㅂ', 'ㅜ', 'ㄹ'],
        ['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ'],
      ]),
    );
  });
});
