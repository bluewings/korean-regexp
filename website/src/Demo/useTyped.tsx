import { useMemo, useEffect, useState, useRef } from 'react';
import { explode, implode } from 'korean-regexp';

function useTyped(strings: string | string[], { typeSpeed = 100, backSpeed = 50, pause = false }: any = {}) {
  const serialized = useMemo(() => JSON.stringify((Array.isArray(strings) ? strings : [strings]).filter((e) => typeof e === 'string')), [strings]);
  const arr = useMemo(() => JSON.parse(serialized), [serialized]);

  const stat = useRef({ typeSpeed, backSpeed });
  stat.current.typeSpeed = typeSpeed;
  stat.current.backSpeed = backSpeed;

  const [char, setChars] = useState<string[]>([]);

  useEffect(() => {
    if (arr.length === 0) {
      return;
    }
    const TYPING = 'typing';
    const DELETE = 'delete';

    let index = 0;
    let forward: any = [];
    let reverse: any = [];
    let chars: string[] = [];

    function initVars(text: string) {
      forward = explode(text);
      reverse = (text.substr(0, text.length - 1) + explode(text.substr(-1)).join('')).split('');
      chars = [];
    }

    let phase = TYPING;
    let timer: any;

    initVars(arr[index]);

    function process() {
      if (pause) {
        timer = setTimeout(process, stat.current.typeSpeed);
      } else if (phase === TYPING) {
        const item = forward.shift() as any;
        if (item) {
          chars.push(item);
          setChars(chars.slice());
          timer = setTimeout(process, stat.current.typeSpeed);
        } else {
          phase = DELETE;
          timer = setTimeout(process, stat.current.typeSpeed);
        }
      } else if (phase === DELETE) {
        if (reverse.length > 0) {
          reverse.pop();
          setChars(reverse.slice());
          timer = setTimeout(process, stat.current.backSpeed);
        } else {
          index = (index + 1) % arr.length;
          initVars(arr[index]);
          phase = TYPING;
          timer = setTimeout(process, stat.current.backSpeed);
        }
      }
    }
    timer = setTimeout(() => {
      process();
    });
    return () => {
      clearTimeout(timer);
    };
  }, [arr, pause]);

  return useMemo(() => implode(char), [char]);
}

export default useTyped;
