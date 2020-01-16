const copy = require('rollup-plugin-copy');
const babel = require('rollup-plugin-babel');
const postcss = require('rollup-plugin-postcss');
const cleanup = require('rollup-plugin-cleanup');
const { uglify } = require('rollup-plugin-uglify');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = [
    // Create separate chunk for vendor packages.
    //      This allows me to maintain and version them through NPM, which is
    //      how I prefer to manage dependencies, but have a separate file to
    //      reduce bundle size.
    {
        input: ['www/vendor.js'],
        output: [
            {
                file: 'public/vendor.js',
                format: 'cjs',
                compact: true,
                sourcemap: false,
            },
        ],
        plugins: [
            resolve({
                preferBuiltins: true,
                mainFields: ['browser'],
            }),
            commonjs(),
        ],
    },

    // Build the application code as a IIFE.
    {
        input: ['./www/app.js'],
        external: ['moment', 'mustache', 'socket.io-client'],
        output: [
            {
                file: 'public/app.js',
                format: 'iife',
                name: 'chat',
                compact: true,
                sourcemap: false,
                globals: {
                    jquery: '$',
                    moment: 'moment',
                    mustache: 'mustache',
                    'socket.io-client': 'io',
                },
            },
        ],
        plugins: [
            postcss({
                extract: true,
                plugins: [
                    require('autoprefixer'),
                    require('tailwindcss'),
                    require('cssnano')({ preset: 'default' }),
                    purgecss({
                        content: ['./views/**/*.ejs'],
                        defaultExtractor: content =>
                            content.match(/[\w-/:]+(?<!:)/g) || [],
                    }),
                ],
            }),
            commonjs(),
            cleanup(),
            babel({
                babelrc: false,
                presets: ['@babel/env'],
            }),
            uglify(),
            copy({
                targets: [{ src: 'www/img/**/*', dest: 'public/img' }],
            }),
        ],
    },
];
