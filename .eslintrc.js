module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [],
  parser: 'babel-eslint',
  plugins: ['react', 'import'],
  globals: {
    var1: true,
    var2: false
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [ '@', './src' ]
        ]
      }
    }
  },
  rules: {
    'indent': ['error', 4],
    'quotes': ['error', 'single'],
    'arrow-parents': 0
  }
};
