const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        app: [
            path.resolve(__dirname, 'www', 'js', 'chat.js'),
            path.resolve(__dirname, 'www', 'js', 'textcolor.js'),
        ],
        // styles: [
        //     path.resolve(__dirname, 'www', 'styles.js'),
        //     path.resolve(__dirname, 'www', 'css', 'textDropdown.css'),
        // ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: 'www/img/*', to: 'img/[name].[hash].[ext]', flatten: true },
            { from: 'www/css/*', to: 'css/[name].[hash].css', flatten: true },
        ]),
    ],
};
