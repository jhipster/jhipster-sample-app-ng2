const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Visualizer = require('webpack-visualizer-plugin');
const ngcWebpack = require('ngc-webpack');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';
const extractCSS = new ExtractTextPlugin(`[name].[hash].css`);

module.exports = webpackMerge(commonConfig({ env: ENV }), {
    // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
    entry: {
        polyfills: './src/main/webapp/app/polyfills',
        global: './src/main/webapp/content/css/global.css',
        main: './src/main/webapp/app/app.main-aot'
    },
    output: {
        path: utils.root('target/www'),
        filename: 'app/[name].[hash].bundle.js',
        chunkFilename: 'app/[id].[hash].chunk.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [
                { loader: 'angular2-template-loader' },
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig-aot.json'
                    },
                }
            ],
            exclude: ['node_modules/generator-jhipster']
        },
        {
            test: /\.css$/,
            loaders: ['to-string-loader', 'css-loader'],
            exclude: /(vendor\.css|global\.css)/
        },
        {
            test: /(vendor\.css|global\.css)/,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }]
    },
    plugins: [
        extractCSS,
        new Visualizer({
            // Webpack statistics in target folder
            filename: '../stats.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            // sourceMap: true, // Enable source maps. Please note that this will slow down the build
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                keep_fnames: true,
                screw_i8: true
            }
        }),
        new ngcWebpack.NgcWebpackPlugin({
            disabled: false,
            tsConfig: utils.root('tsconfig-aot.json'),
            resourceOverride: ''
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ]
});
