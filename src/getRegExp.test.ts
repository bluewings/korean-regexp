import getRegExp from './getRegExp';

describe('getRegExp', () => {
  [
    ['대한민ㄱ', '대한민[가-깋]'],
    ['대한민구', '대한민[구-귛]'],
    ['대한민국', '대한민(국|구[가-깋])'],
    ['온라이', '온라[이-잏]'],
    ['깎', '(깎|까[까-낗]|깍[가-깋])'],
    ['뷁', '(뷁|뷀[가-깋])'],
    ['korea', 'korea'],
  ].forEach(([search, pattern]: any) => {
    test(`getRegExp '${search}' → '${pattern}'`, () => {
      expect(getRegExp(search).source).toBe(pattern);
    });
  });
});

describe('options.initialSearch', () => {
  test('initialSearch: false (default)', () => {
    expect(getRegExp('ㅎㄱ').source).toBe(getRegExp('ㅎㄱ', { initialSearch: false }).source);
    expect(getRegExp('ㅎㄱ', { initialSearch: false }).source).toBe('ㅎ[가-깋]');
    expect(getRegExp('^ㅎㄱ$', { initialSearch: false }).source).toBe('\\^ㅎㄱ\\$');
  });
  test('initialSearch: true', () => {
    expect(getRegExp('ㅎㄱ', { initialSearch: true }).source).toBe('[하-힣][가-깋]');
    expect(getRegExp('^ㅎㄱ$', { initialSearch: true }).source).toBe('\\^[하-힣][가-깋]\\$');
  });
});

describe('options.startsWith', () => {
  test('startsWith: false (default)', () => {
    expect(getRegExp('ㅎㄱ').source).toBe(getRegExp('ㅎㄱ', { startsWith: false }).source);
    expect(getRegExp('ㅎㄱ', { startsWith: false }).source).toBe('ㅎ[가-깋]');
    expect(getRegExp('^ㅎㄱ$', { startsWith: false }).source).toBe('\\^ㅎㄱ\\$');
  });
  test('startsWith: true', () => {
    expect(getRegExp('ㅎㄱ', { startsWith: true }).source).toBe('^ㅎ[가-깋]');
    expect(getRegExp('^ㅎㄱ$', { startsWith: true }).source).toBe('^\\^ㅎㄱ\\$');
  });
});

describe('options.endsWith', () => {
  test('endsWith: false (default)', () => {
    expect(getRegExp('ㅎㄱ').source).toBe(getRegExp('ㅎㄱ', { endsWith: false }).source);
    expect(getRegExp('ㅎㄱ', { endsWith: false }).source).toBe('ㅎ[가-깋]');
    expect(getRegExp('^ㅎㄱ$', { endsWith: false }).source).toBe('\\^ㅎㄱ\\$');
  });
  test('endsWith: true', () => {
    expect(getRegExp('ㅎㄱ', { endsWith: true }).source).toBe('ㅎ[가-깋]$');
    expect(getRegExp('^ㅎㄱ$', { endsWith: true }).source).toBe('\\^ㅎㄱ\\$$');
  });
});

describe('options.ignoreCase', () => {
  test('ignoreCase: true (default)', () => {
    expect(getRegExp('ㅎㄱ').toString()).toBe(getRegExp('ㅎㄱ', { ignoreCase: true }).toString());
    expect(getRegExp('ㅎㄱ', { ignoreCase: true }).toString()).toBe('/ㅎ[가-깋]/i');
  });
  test('ignoreCase: false', () => {
    expect(getRegExp('ㅎㄱ', { ignoreCase: false }).toString()).toBe('/ㅎ[가-깋]/');
  });
});

describe('options.global', () => {
  test('global: false (default)', () => {
    expect(getRegExp('ㅎㄱ').toString()).toBe(getRegExp('ㅎㄱ', { global: false }).toString());
    expect(getRegExp('ㅎㄱ', { global: false }).toString()).toBe('/ㅎ[가-깋]/i');
  });
  test('global: true', () => {
    expect(getRegExp('ㅎㄱ', { global: true }).toString()).toBe('/ㅎ[가-깋]/gi');
  });
});
