# korean-regexp

[![npm version](https://badge.fury.io/js/korean-regexp.svg)](https://badge.fury.io/js/korean-regexp)

### Installation

    npm install korean-regexp

### Usage

```js
import { getRegExp } from 'korean-regexp';

getRegExp('아름다운 한ㄱ');   // /아름다운 한[가-깋]/i
getRegExp('아름다운 한그');   // /아름다운 한[그-긯]/i
getRegExp('아름다운 한글');   // /아름다운 한(글|그[라-맇])/i
```
