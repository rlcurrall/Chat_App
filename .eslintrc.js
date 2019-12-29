module.exports = {
    'env': {
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    'plugins': [
        'vue',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'block-spacing': ['error', 'always'],
        'comma-dangle': ['error', {
            'arrays': 'always',
            'objects': 'always',
            'imports': 'always',
            'exports': 'always',
            'functions': 'never'
        }],
        'max-len': ['error', { 'code': 120, 'ignoreComments': true }]
    }
};