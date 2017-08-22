var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.scss', 'jpg', 'png']
    },
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM'
    },
    module: {
        rules: [{
            test: /.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}], 'react', 'stage-0'],
                    plugins: ['syntax-dynamic-import', ["import", { libraryName: "antd", style: "css" }]]
                }
            }]
        }, {
            test: /.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /.(jpg|png|eot|svg|ttf|woff|woff2)$/,
            use: 'file-loader?name=assets/[hash:8].[name].[ext]'
        }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({hash: true, template: './template.html'}),
        new webpack.optimize.UglifyJsPlugin({compressor: {pure_getters: true,unsafe: true,unsafe_comps: true,screw_ie8: true,warnings: false}}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    ],
    devtool: 'inline-source-map', /*eval-source-map*/
    output:{
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    entry: {"app": "./js/App.js"}
};