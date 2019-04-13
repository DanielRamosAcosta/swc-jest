# swc-jest

[Swc](https://github.com/swc-project/swc) [jest](https://github.com/facebook/jest) plugin

## Usage

If you are already using `jest-cli`, just add `swc-jest` and it will automatically compile JavaScript code using swc.

```bash
yarn add --dev swc-jest @swc/core
```

If you would like to write your own preprocessor, uninstall and delete swc-jest and set the [config.transform](https://jestjs.io/docs/configuration#transform-object-string-string) option to your preprocessor.

## Setup

_Note: this step is only required if you are using `swc-jest` with additional code preprocessors._

To explicitly define `swc-jest` as a transformer for your JavaScript code, map _.js_ files to the `swc-jest` module.

```json
"transform": {
  "^.+\\.jsx?$": "swc-jest"
},
```
