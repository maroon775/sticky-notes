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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            modules: true,
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        /*options: {
                            strictMath: true,
                        },*/
                    },
                ],
            },
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
