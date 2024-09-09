const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// Check if the environment is production
const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
    }),
    new MiniCssExtractPlugin({
        filename: 'styles.css',
    }),
];


// if (isProduction) {
//     plugins.push(
//         new WorkboxPlugin.GenerateSW({
//             clientsClaim: true,
//             skipWaiting: true,
//         })
//     );
// }

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: plugins, // Use the plugins array with conditional logic
    // devServer: {
    //     port: 8000,
    //     allowedHosts: 'all'
    // }
}
