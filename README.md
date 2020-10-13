# korean-regexp

[![npm version](https://badge.fury.io/js/korean-regexp.svg)](https://badge.fury.io/js/korean-regexp)

[자연스러운 한글 정규식](https://bluewings.github.io/unobstructed-hangul-regular-expression/)을 사용할 수 있습니다.

<a href="https://bluewings.github.io/unobstructed-hangul-regular-expression/"><img src='https://user-images.githubusercontent.com/1563202/95799432-989d4600-0d2f-11eb-8f84-de91659090b7.gif'></a>


### Installation

    npm install korean-regexp

### Usage

```js
import { getRegExp, getPhonemes, explode, implode } from 'korean-regexp';

// the process of typing '개울가'
getRegExp('ㄱ');  // /[가-깋]/i
getRegExp('개');  // /[개-갷]/i
getRegExp('갱');  // /(갱|개[아-잏])/i
getRegExp('개우');  // /개[우-윟]/i
getRegExp('개울');  // /개(울|우[라-맇])/i
getRegExp('개욹');  // /개(욹|울[가-깋])/i
getRegExp('개울가');  // /개울[가-갛]/i

getRegExp('ㅊㅅ퀴즈');   // /ㅊㅅ퀴[즈-즿]/i
getRegExp('ㅊㅅ퀴즈', {  // /^[차-칳]\s*[사-싷]\s*퀴\s*[즈-즿]$/g
  initialSearch: true,
  startsWith: true,
  endsWith: true,
  ignoreSpace: true,
  ignoreCase: false,
  global: true,
});

getPhonemes('한');
// {
//   initial: 'ㅎ',
//   medial: 'ㅏ',
//   finale: 'ㄴ',
//   initialOffset: 18,
//   medialOffset: 0,
//   finaleOffset: 4
// }

explode('한글');                     // ['ㅎ', 'ㅏ', 'ㄴ', 'ㄱ', 'ㅡ', 'ㄹ']
explode('한글', { grouped: true });  // [['ㅎ', 'ㅏ', 'ㄴ'], ['ㄱ', 'ㅡ', 'ㄹ']]

implode('ㅇㅓㅂㅔㄴㅈㅕㅅㅡ ㅇㅐㄴㄷㅡㄱㅔㅇㅣㅁ');  // 어벤져스 앤드게임
implode(['ㅂ', 'ㅜ', 'ㄹ', 'ㄷ', 'ㅏ', 'ㄹ', 'ㄱ']);  // 불닭
implode([['ㅂ', 'ㅜ', 'ㄹ'], ['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ']]);  // 불닭
```
