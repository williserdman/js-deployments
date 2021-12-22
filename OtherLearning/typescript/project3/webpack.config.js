const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDir = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDir, "src/app.ts"),
    output: {
        filename: "js/myWebpackBundle.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        static: path.resolve(appDir, "public"),
        hot: true,
        devMiddleware: {
            publicPath: '/'
        }
    },
    module: {
        rules:[
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template:path.resolve(appDir, "public/index.html")
        })
    ],
    mode: "development"
};