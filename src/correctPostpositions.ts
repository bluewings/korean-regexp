import getPhonemes from './getPhonemes';

const postPositions = [
  ['은', '는'],
  ['이', '가'],
  ['을', '를'],
  ['과', '와'],
].reduce((accum: any, [p1, p2]) => ([
  ...accum,
  [RegExp(`([가-힣]['" ]{0,1})${p1}\\(${p2}\\)(\\s+)`, 'g'), p1, p2],
  [RegExp(`([가-힣]['" ]{0,1})${p2}\\(${p1}\\)(\\s+)`, 'g'), p1, p2],
]), []);

function correctPostpositions(text: string) {
  return postPositions.reduce((prev, [pattern, p1, p2]: any) =>
    prev.replace(pattern, (whole: string, a1: string, a2: string) =>
      `${a1.replace(/\s+$/, '')}${getPhonemes(a1).finale ? p1 : p2}${a2}`
    ), text);
}

export default correctPostpositions;
