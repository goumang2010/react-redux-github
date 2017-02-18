const WebpackConfig = require('webpack-config');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');

const paths = {
    src: path.join(__dirname, '../src'),
    modules: path.join(__dirname, '../src/modules'),
    components: path.join(__dirname, '../src/components'),
    store: path.join(__dirname, '../src/store'),
    root: path.join(__dirname, '../src/root'),
    routes: path.join(__dirname, '../src/routes'),
    common: path.join(__dirname, '../src/common'),
    localStore: path.join(__dirname, '../node_modules/store/store.js'),
    middleware: path.join(__dirname, '../src/middleware'),
};

const config = {

    devtool: 'inline-source-map',

    entry: {
        vendor: ['react', 'redux', 'react-dom', 'react-redux', 'react-router'],
    },

    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ],

    module: {
        loaders: [
            // jsx
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /(node_modules)/
            },
            //js
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/
            },
            //less
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            //css
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            //file
            {
                test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
        ]
    },

    postcss() {
        return [
            autoprefixer({ browsers: ['last 7 versions'] }),
            px2rem({ remUnit: 75 }),
        ];
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: Object.assign({}, paths)
    },
};

module.exports = new WebpackConfig.Config().merge(config);