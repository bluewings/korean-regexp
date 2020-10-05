import getRegExp from './getRegExp';

const data = [
  ['대한민ㄱ', '/대한민[가-깋]/'],
  ['대한민구', '/대한민[구-귛]/'],
  ['대한민국', '/대한민(국|구[가-깋])/'],
  ['온라이', '/온라[이-잏]/'],
  ['깎', '/(깎|까[까-낗]|깍[가-깋])/'],
  ['뷁', '/(뷁|뷀[가-깋])/'],
  ['korea', '/korea/'],
];

describe('getRegExp', () => {
  data.forEach(([search, pattern]: any) => {
    test(`getRegExp '${search}'`, () => {
      expect(getRegExp(search).toString()).toBe(pattern);
    });
  });
});
