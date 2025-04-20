const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        bundle: "./src/index.js",
    },

    externals: {
        jquery: "jQuery",
        underscore: "_",
        lodash: "lodash",
        react: ["vendor", "React"],
        "react-dom": ["vendor", "ReactDOM"],
        "@wordpress/i18n": ["vendor", "wp", "i18n"],
        "@wordpress/hooks": ["vendor", "wp", "hooks"],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "thread-loader",
                        options: { workers: -1 },
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            compact: false,
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        modules: false,
                                        targets: "> 5%",
                                    },
                                ],
                                "@babel/preset-react",
                            ],
                            cacheDirectory: false,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
        ],
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "**/module.json",
                    context: "src/modules",
                    to: path.resolve(__dirname, "modules-json"),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "diviflash-5-modules.min.css", // Minified CSS output
        }),
    ],

    optimization: {
        minimize: true, // Enable JS & CSS Minification
        minimizer: [
            new TerserPlugin({ // Minify JavaScript
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    compress: {
                        drop_console: true, // Remove console logs
                    },
                },
                extractComments: false, // Do not extract comments into separate file
            }),
            new CssMinimizerPlugin(), // Minify CSS
        ],
    },

    resolve: {
        extensions: [".js", ".jsx", ".json", ".scss"],
    },

    output: {
        filename: "diviflash-5-modules.min.js", // Minified JS output
        path: path.resolve(__dirname, "build"),
    },

    stats: {
        errorDetails: true,
    },
};
