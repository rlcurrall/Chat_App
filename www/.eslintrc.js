module.exports = {
    'env': {
        'es6': true,
        'browser': true
    },
    'extends': [
        'eslint:recommended',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'html',
        'prettier',
    ],
    'rules': {
        'prettier/prettier': 'error',
        'linebreak-style': ['error', 'unix'],
    },
    'settings': {
        'html/html-extensions': ['.html', '.ejs']
    }
};
