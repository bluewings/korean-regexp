import { BASE, INITIALS, MEDIALS, FINALES, MIXED } from './constant';

const complexDict: any = Object.entries(MIXED).reduce((accum, [k, v]: any) => ({ ...accum, [v.join('')]: k }), {});

function assemble(arr: any) {
  const startIndex = arr.findIndex((e: string) => MEDIALS.indexOf(e) !== -1);
  const endIndex = startIndex !== -1 && MEDIALS.indexOf(arr[startIndex + 1]) !== -1 ? startIndex + 1 : startIndex;
  let initial = arr.slice(0, startIndex).join('');
  let medial = arr.slice(startIndex, endIndex + 1).join('');
  let finale = arr.slice(endIndex + 1).join('');
  const initialOffset = INITIALS.indexOf(complexDict[initial] || initial);
  const medialOffset = MEDIALS.indexOf(complexDict[medial] || medial);
  const finaleOffset = FINALES.indexOf(complexDict[finale] || finale);
  if (initialOffset !== -1 && medialOffset !== -1) {
    return String.fromCharCode(BASE + initialOffset * (MEDIALS.length * FINALES.length) + medialOffset * FINALES.length + finaleOffset);
  }
  return arr.join('');
}

function implode(input: string | (string | string[])[]) {
  const chars: any[] = [];

  // 인접한 모음을 하나의 복합 모음으로 합친다.
  (typeof input === 'string' ? input.split('') : input).forEach((e: any, i: number, arr: any) => {
    if (typeof e === 'string' && chars.length > 0 && MEDIALS.indexOf(arr[i - 1]) !== -1 && MEDIALS.indexOf(e) !== -1 && complexDict[`${arr[i - 1]}${e}`]) {
      chars[chars.length - 1] = complexDict[`${arr[i - 1]}${e}`];
    } else {
      chars.push(e);
    }
  });

  let cursor: any = { medial: null, finales: [] };
  let items: any[] = [cursor];

  // 모음으로 시작하는 그룹들을 만든다. (grouped로 넘어온 항목들은 유지)
  chars.forEach((e) => {
    if (Array.isArray(e)) {
      cursor = { medial: null, finales: [] };
      items.push({ grouped: e, finales: [] });
      items.push(cursor);
    } else if (MEDIALS.indexOf(e) !== -1) {
      cursor = { medial: e, finales: [] };
      items.push(cursor);
    } else {
      cursor.finales.push(e);
    }
  });

  // 각 그룹을 순회하면서 복합자음을 정리하고, 앞 그룹에서 종성으로 사용하고 남은 자음들을 초성으로 가져온다.
  items.forEach((curr, i, arr) => {
    if (i > 0) {
      const prev = arr[i - 1];
      if (!prev.medial || prev.finales.length === 1) {
        curr.initials = prev.finales;
        prev.finales = [];
      } else {
        const [finale, ...initials] = prev.finales;
        curr.initials = initials;
        prev.finales = finale ? [finale] : [];
      }
      if (curr.finales.length > 1) {
        const [a, b, ...rest] = curr.finales;
        if (complexDict[`${a}${b}`]) {
          curr.finales = [complexDict[`${a}${b}`], ...rest];
        }
      }
    }
  });

  // 각 글자에 해당하는 블록 단위로 나눈 후 조합한다.
  const groups: any[] = [];
  items.forEach(({ initials, medial, finales, grouped }: any) => {
    if (grouped) {
      groups.push(grouped);
    } else if (initials && finales) {
      const pre = initials.slice();
      const initial = pre.pop();
      const [finale, ...post] = finales;
      pre.forEach((e: any) => groups.push([e]));
      groups.push([initial, medial, finale].filter(Boolean));
      post.forEach((e: any) => groups.push([e]));
    }
  });

  return groups.map(assemble).join('');
}

export default implode;
