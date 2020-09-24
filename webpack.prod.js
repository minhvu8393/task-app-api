const  { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: 'warning'
    },
    output: {
        pathinfo: false
    },
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        concatenateModules: true,
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            hidePathInfo: true,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
        },
        noEmitOnErrors: true,
        checkWasmTypes: true,
        minimize: true,
    },
    plugins: [
        new TerserPlugin(/* ... */),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        ],
    module: {
        rules: [
            {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    devtool: 'source-map',
        
})