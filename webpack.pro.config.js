const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: __dirname + '/src/app/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                //loader: 'style!css?modules!postcss'
                loader: 'style!css!postcss'
            },
            {
                test: /\.scss$/,
                //loader: 'style!css?modules!sass!postcss'
                loader: 'style!css!sass!postcss'
            }
        ]
    },

    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
            __LOCAL__: false,                                  // 本地环境
            __PRO__:   true   
        }),
        new CleanWebpackPlugin(['dist'], {
            "root": __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.optimize.UglifyJsPlugin({               //压缩JS代码
            compress: {
                warnings: false                             //不显示warning
            }
        }),
    ]
};

module.exports = config;
