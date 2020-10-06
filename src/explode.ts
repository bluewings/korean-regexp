import { MIXED, PRESENT_ON_KEYBOARD } from './constant';
import getPhonemes from './getPhonemes';

interface ExplodeOptions {
  grouped?: boolean;
}

function explode(text: string, { grouped = false }: ExplodeOptions = {}) {
  const accum: string[][] = [];
  text.split('').forEach((char) => {
    const { initial, medial, finale, initialOffset, medialOffset, finaleOffset } = getPhonemes(char);
    accum.push(
      (initialOffset !== -1 || medialOffset !== -1 || finaleOffset !== -1
        ? [initial, MIXED[medial] && PRESENT_ON_KEYBOARD.indexOf(medial) === -1 ? MIXED[medial] : medial, MIXED[finale] && PRESENT_ON_KEYBOARD.indexOf(finale) === -1 ? MIXED[finale] : finale].filter(
            Boolean,
          )
        : [char]
      ).flat(),
    );
  });
  return grouped ? accum : accum.flat();
}

export default explode;
