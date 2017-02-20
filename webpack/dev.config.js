const webpack = require('webpack');
const WebpackConfig = require('webpack-config');
const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = new WebpackConfig.Config().extend('./webpack/base.config.js').merge({
    devtool: '#eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
    entry: {
        entry: [
            'babel-polyfill',
            hotMiddlewareScript,
            path.join(__dirname, '../src/entry.js'),
        ],
    },
    output:{
        publicPath:'/',
    },
    debug: true
});