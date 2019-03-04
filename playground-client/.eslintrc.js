const path = require('path');

module.exports = {
  "extends": [
    "react-app"
  ],
  "settings": {
    "import/resolver": {
      node: { paths: [path.resolve('./src')]}
    }
  },
  "rules": {
    "indent": 0,
    "semi": [ "error", "always" ],
    "no-trailing-spaces": 0,
    "keyword-spacing": 0,
    "no-unused-vars": 0,
    "no-useless-return": 0,
    "no-multiple-empty-lines": 1,
    "space-before-function-paren": 0,
    "eol-last": 0,
    "no-unexpected-multiline": 0,
    "arrow-spacing": ["error", { "before": true, "after": true }] ,
    "padded-blocks": 0,
    "object-curly-spacing": ["error", "always"]
  },
  "overrides": {
    "files": ["src/*.js"]
  }
}