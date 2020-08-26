const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
       './app/index.jsx'
    ],
    mode: 'development',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'distWebpack'),
        publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]

    }
}
