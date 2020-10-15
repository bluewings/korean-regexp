import { KEYS } from './constant';
import explode from './explode';

const KR_TO_EN: any = Object.values(KEYS)
  .reduce((accum, [kr, en]) => ({ ...accum, [kr]: en }), {});

function korToEng(text: string) {
  return text.split('').map((char) => (explode(char, { grouped: false }) as any).map((e: string) => KR_TO_EN[e] || e)).flat().join('');
}

export default korToEng;
