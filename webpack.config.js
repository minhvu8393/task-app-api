const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        index: './client/src/index/app.js',
        signup: './client/src/signup/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, './statics/js')
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                    plugins: [
                        'transform-class-properties'
                    ]
                },
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                test: /\.s?css$/
            }
        ]
    },
    mode: 'production',

    devtool: 'cheap-module-eval-source-map'
}