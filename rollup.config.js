const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');
const cleanup = require('rollup-plugin-cleanup');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');

module.exports = {
    input: ['./www/app.js'],
    plugins: [
        postcss({
            extract: true,
            plugins: [require('autoprefixer'), require('tailwindcss')],
        }),
        resolve({
            preferBuiltins: true,
            mainFields: ['browser'],
        }),
        commonjs(),
        cleanup(),
        copy({
            targets: [{ src: 'www/img/**/*', dest: 'public/img' }],
        }),
    ],
    output: [
        {
            file: 'public/app.js',
            format: 'iife',
            compact: true,
            sourcemap: false,
        },
    ],
};
