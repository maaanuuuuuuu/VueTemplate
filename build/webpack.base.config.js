const path = require('path')


const config = {
    entry: {
        app: path.resolve(__dirname, '../src/client-entry.js'),
        vendor: ['vue', 'vue-router', "vuex", 'axios']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /(\.js$)|(\.vue$)/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    fix: true
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    css: 'css-loader',
                    'scss': 'sass-loader'
                }
            },
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                loader:'css-loader',
                test: /\.css$/
            },
            {
                loader:'file-loader',
                test: /\.(png|jpg|gif|ttf|woff)$/,
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'assets/js/[name].js'
    }
}

module.exports = config;