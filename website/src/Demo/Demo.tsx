import React, { useMemo, useState } from 'react';
import { Menu, Dropdown, Input, Slider } from 'antd';
import { getRegExp } from 'korean-regexp';
import styles from './Demo.module.scss';
import useTyped from './useTyped';
import movies from './movies.json';

const compareIndex = ({ index: a }: any, { index: b }: any) => (a === b ? 0 : a < b ? -1 : 1);

const NUM_OF_DISPLAYS = 10;

const keywords: string[] = [];
movies.forEach(([title]: any) => {
  title
    .replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣]/g, ' ')
    .split(/\s+/)
    .filter((title: string) => title.length > 2)
    .forEach((title: string) => keywords.push(title));
});

function Demo() {
  const [randomKeywords, setRandomKeywords] = useState(() => shuffle(keywords));

  const [focused, setFocused] = useState(false);
  const [userInput, setUserInput] = useState('');

  const [typeSpeed, setTypeSpeed] = useState(300);
  const typed = useTyped(randomKeywords, {
    typeSpeed,
    backSpeed: typeSpeed / 3,
    pause: focused,
  });

  const value = focused ? userInput : typed;

  const inputOptions = {
    onFocus: (event: any) => {
      setFocused(true);
      setUserInput(event.target.value);
    },
    onBlur: () => {
      setFocused(false);
      setUserInput('');
      setRandomKeywords(shuffle(keywords));
    },
    onChange: (event: any) => {
      setUserInput(event.target.value);
    },
    value,
  };

  const regexp = useMemo(
    () =>
      getRegExp(value, {
        ignoreSpace: true,
        initialSearch: true,
      }),
    [value],
  );

  const [filtered1, menu1] = useFiltered(movies, value);
  const [filtered2, menu2] = useFiltered(movies, regexp);

  return (
    <div className={styles.root}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>한글 정규식</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Slider defaultValue={typeSpeed} min={100} max={2000} step={10} onChange={setTypeSpeed} />
          </div>
          <div className="col-6">
            <Input size="large" {...inputOptions} />
            {filtered1.length > 0 && (
              <Dropdown overlay={menu1} visible={filtered1.length > 0}>
                <div />
              </Dropdown>
            )}
          </div>
          <div className="col-6">
            <Input size="large" {...inputOptions} />
            {filtered2.length > 0 && (
              <Dropdown overlay={menu2} visible={filtered2.length > 0}>
                <div />
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;

function shuffle(arr: any[]) {
  let array = [...arr];
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function useFiltered(array: any[], pattern: RegExp | string) {
  return useMemo(() => {
    const filtered = array
      .map(([title, code]: any) => ({
        title,
        code,
        index: typeof pattern === 'string' ? title.indexOf(pattern) : title.search(pattern),
      }))
      .filter(({ index }: any) => index !== -1)
      .sort(compareIndex)
      .slice(0, NUM_OF_DISPLAYS);
    return [
      filtered,
      <Menu>
        {filtered.map(({ title, code }: any, i: number) => (
          <Menu.Item key={i}>
            <span
              dangerouslySetInnerHTML={{
                __html: title.replace(pattern, (whole: string) => `<strong style="color:#fe1a1a;">${whole}</strong>`),
              }}
            />
          </Menu.Item>
        ))}
      </Menu>,
    ];
  }, [array, pattern]) as [any[], any];
}
