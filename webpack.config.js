const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8002,
        watchContentBase: true,
        progress: true,
        stats: 'minimal',
//        inline: false,
//        injectClient: false,
//        injectHot: false,
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true,
                        transpileOnly: true,
                        experimentalWatchApi: true
                    }
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
