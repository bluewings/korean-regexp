import correctPostpositions from './correctPostpositions';

describe('correctPostpositions', () => {
  [
    ['전쟁와(과) 평화', '전쟁과 평화'],
    ['죄와(과) 벌', '죄와 벌'],
    ['설탕은(는) 달다', '설탕은 달다'],
    ['고양이은(는) 건드리지 마라', '고양이는 건드리지 마라'],
    ['홍길동이(가) 홍상직을(를) 만났다', '홍길동이 홍상직을 만났다'],
    ['토끼이(가) 거북이을(를) 만났다', '토끼가 거북이를 만났다'],
    ['"토끼"이(가) \'거북이\'을(를) 만났다', `"토끼"가 '거북이'를 만났다`],
    ['고양이 은(는) 건드리지 마라', '고양이는 건드리지 마라'],
  ].forEach(([before, after]: any) => {
    test(`correctPostpositions '${before}' → '${after}'`, () => {
      expect(correctPostpositions(before)).toBe(after);
    });
  });
});
