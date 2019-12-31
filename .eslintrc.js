module.exports = {
    'env': {
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential',
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
        'vue',
        'html',
        'prettier',
    ],
    'rules': {
        'prettier/prettier': 'error',
        'linebreak-style': ['error', 'unix'],
    }
};