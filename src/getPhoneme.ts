import { BASE, INITIALS, MEDIALS, FINALES } from './constant';

function getPhoneme(char: string) {
  let initial = '';
  let medial = '';
  let finale = '';
  let initialOffset = -1;
  let medialOffset = -1;
  let finaleOffset = -1;
  if (char.match(/[ㄱ-ㅎ]/)) {
    initial = char;
    initialOffset = INITIALS.join('').search(char);
  } else if (char.match(/[가-힣]/)) {
    const tmp = char.charCodeAt(0) - BASE;
    finaleOffset = tmp % FINALES.length;
    medialOffset = ((tmp - finaleOffset) / FINALES.length) % MEDIALS.length;
    initialOffset = ((tmp - finaleOffset) / FINALES.length - medialOffset) / MEDIALS.length;
    initial = INITIALS[initialOffset];
    medial = MEDIALS[medialOffset];
    finale = FINALES[finaleOffset];
  }
  return { initial, medial, finale, initialOffset, medialOffset, finaleOffset };
}

export default getPhoneme;
