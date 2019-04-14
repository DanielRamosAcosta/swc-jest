# swc-jest

[![npm](https://img.shields.io/npm/v/swc-jest.svg)](https://www.npmjs.com/package/swc-jest)

[swc](https://github.com/swc-project/swc) [jest](https://github.com/facebook/jest) plugin

## Install

```bash
npm install --save-dev swc-jest @swc/core
```

## Setup

You have to define `swc-jest` as a transformer for your JavaScript code, map _.js_ files to the `swc-jest` module.

```json
"transform": {
  "^.+\\.jsx?$": "swc-jest"
},
```
