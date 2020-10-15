import { KEYS } from './constant';
import implode from './implode';

const EN_TO_KR: any = Object.values(KEYS)
  .reduce((accum, [kr, en]) => ({ ...accum, [en]: kr }), {});

function engToKor(text: string) {
  return implode(text.split('').map(char => EN_TO_KR[char] || char).join(''));
}

export default engToKor;
