module.exports = {
  'extends': [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  'plugins': [
    'prettier',
  ],
  'parser': 'babel-eslint',
  'env': {
    'es6': true,
    'browser': true,
    "jest": true
  },
  'rules': {
    'prettier/prettier': 'error'
  }
};
