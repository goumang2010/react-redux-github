const webpack = require('webpack');
const WebpackConfig = require('webpack-config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

process.env.NODE_ENV = 'production';

module.exports = new WebpackConfig.Config().extend('./webpack/base.config.js').merge({
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    entry: {
        entry: [
            'babel-polyfill',
            path.join(__dirname, '../src/entry.js')
        ],
    },
    output: {
        // publicPath:'https://faofao931013.github.io/react-redux-github/dist/'
    }
});