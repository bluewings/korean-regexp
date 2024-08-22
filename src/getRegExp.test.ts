import getRegExp from './getRegExp';

describe('getRegExp', () => {
  [
    ['대한민ㄱ', '대한민[ㄱ가-깋]'],
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
    expect(getRegExp('ㅎㄱ', { initialSearch: false }).source).toBe('ㅎ[ㄱ가-깋]');
    expect(getRegExp('^ㅎㄱ$', { initialSearch: false }).source).toBe('\\^ㅎㄱ\\$');
  });
  test('initialSearch: true', () => {
    expect(getRegExp('ㅎㄱ', { initialSearch: true }).source).toBe('[ㅎ하-힣][ㄱ가-깋]');
    expect(getRegExp('^ㅎㄱ$', { initialSearch: true }).source).toBe('\\^[ㅎ하-힣][ㄱ가-깋]\\$');
  });
});

describe('options.startsWith', () => {
  test('startsWith: false (default)', () => {
    expect(getRegExp('ㅎㄱ').source).toBe(getRegExp('ㅎㄱ', { startsWith: false }).source);
    expect(getRegExp('ㅎㄱ', { startsWith: false }).source).toBe('ㅎ[ㄱ가-깋]');
    expect(getRegExp('^ㅎㄱ$', { startsWith: false }).source).toBe('\\^ㅎㄱ\\$');
  });
  test('startsWith: true', () => {
    expect(getRegExp('ㅎㄱ', { startsWith: true }).source).toBe('^ㅎ[ㄱ가-깋]');
    expect(getRegExp('^ㅎㄱ$', { startsWith: true }).source).toBe('^\\^ㅎㄱ\\$');
  });
});

describe('options.endsWith', () => {
  test('endsWith: false (default)', () => {
    expect(getRegExp('ㅎㄱ').source).toBe(getRegExp('ㅎㄱ', { endsWith: false }).source);
    expect(getRegExp('ㅎㄱ', { endsWith: false }).source).toBe('ㅎ[ㄱ가-깋]');
    expect(getRegExp('^ㅎㄱ$', { endsWith: false }).source).toBe('\\^ㅎㄱ\\$');
  });
  test('endsWith: true', () => {
    expect(getRegExp('ㅎㄱ', { endsWith: true }).source).toBe('ㅎ[ㄱ가-깋]$');
    expect(getRegExp('^ㅎㄱ$', { endsWith: true }).source).toBe('\\^ㅎㄱ\\$$');
  });
});

describe('options.ignoreSpace', () => {
  test('ignoreSpace: false (default)', () => {
    expect(getRegExp('한글날').source).toBe(getRegExp('한글날', { ignoreSpace: false }).source);
    expect(getRegExp('한글날', { ignoreSpace: false }).source).toBe('한글(날|나[라-맇])');
    expect(getRegExp('한', { ignoreSpace: false }).source).toBe('(한|하[나-닣])');
    expect(getRegExp('k', { ignoreSpace: false }).source).toBe('k');
    expect(getRegExp('keyword', { ignoreSpace: false }).source).toBe('keyword');
  });
  test('ignoreSpace: true', () => {
    expect(getRegExp('한글날', { ignoreSpace: true }).source).toBe('한\\s*글\\s*(날|나[라-맇])');
    expect(getRegExp('한', { ignoreSpace: true }).source).toBe('(한|하[나-닣])');
    expect(getRegExp('k', { ignoreSpace: true }).source).toBe('k');
    expect(getRegExp('keyword', { ignoreSpace: true }).source).toBe('k\\s*e\\s*y\\s*w\\s*o\\s*r\\s*d');
  });
});

describe('options.ignoreCase', () => {
  test('ignoreCase: true (default)', () => {
    expect(getRegExp('ㅎㄱ').toString()).toBe(getRegExp('ㅎㄱ', { ignoreCase: true }).toString());
    expect(getRegExp('ㅎㄱ', { ignoreCase: true }).toString()).toBe('/ㅎ[ㄱ가-깋]/i');
  });
  test('ignoreCase: false', () => {
    expect(getRegExp('ㅎㄱ', { ignoreCase: false }).toString()).toBe('/ㅎ[ㄱ가-깋]/');
  });
});

describe('options.global', () => {
  test('global: false (default)', () => {
    expect(getRegExp('ㅎㄱ').toString()).toBe(getRegExp('ㅎㄱ', { global: false }).toString());
    expect(getRegExp('ㅎㄱ', { global: false }).toString()).toBe('/ㅎ[ㄱ가-깋]/i');
  });
  test('global: true', () => {
    expect(getRegExp('ㅎㄱ', { global: true }).toString()).toBe('/ㅎ[ㄱ가-깋]/gi');
  });
});

describe('options.nonCaptureGroup', () => {
  test('ignoreSpace: false (default)', () => {
    expect(getRegExp('한글날').source).toBe(getRegExp('한글날').source);
    expect(getRegExp('한글날').source).toBe('한글(날|나[라-맇])');
  });
  test('ignoreSpace: true', () => {
    expect(getRegExp('한글날', { nonCaptureGroup: true }).source).toBe('한글(?:날|나[라-맇])');
  });
});

describe('options.fuzzy', () => {
  test('fuzzy: false (default)', () => {
    const pattern = getRegExp('ㅋㅍ', { initialSearch: true, fuzzy: false });
    const words = ['카페', '카카오페이', '카페오레', '카메라', '아카펠라'];
    const matched = words.filter((word) => word.match(pattern));
    expect(matched).toMatchObject(['카페', '카페오레', '아카펠라']);
  });
  test('fuzzy: true', () => {
    const pattern = getRegExp('ㅋㅍ', { initialSearch: true, fuzzy: true });
    const words = ['카페', '카카오페이', '카페오레', '카메라', '아카펠라'];
    const matched = words.filter((word) => word.match(pattern));
    expect(matched).toMatchObject(['카페', '카카오페이', '카페오레', '아카펠라']);
  });
});

describe('options.engToKor', () => {
  test('engToKor: false (default)', () => {
    const pattern = getRegExp('gksr', { engToKor: false });
    const words = ['gksr', '한글', '한국', '대한민국'];
    const matched = words.filter((word) => word.match(pattern));
    expect(matched).toMatchObject(['gksr']);
  });
  test('engToKor: true', () => {
    const pattern = getRegExp('gksr', { engToKor: true });
    const words = ['gksr', '한글', '한국', '대한민국'];
    const matched = words.filter((word) => word.match(pattern));
    expect(matched).toMatchObject(['gksr', '한글', '한국']);
  });
  test('engToKor: true (valid / invalid korean pattern)', () => {
    expect(getRegExp('gksr', { engToKor: true }).source).toBe('(gksr)|(한[ㄱ가-깋])');
    expect(getRegExp('korea', { engToKor: true }).source).toBe('korea');
  });
});
