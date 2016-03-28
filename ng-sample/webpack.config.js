var path = require("path");
var webpack = require("webpack");
var tnsCoreModulesAliases = require("./module-aliases").tnsCoreModulesAliases;

var platform = process.env.PLATFORM;
var platformOutDir = process.env.PLATFORM_DIR;
console.log('PLATFORM: ' + platform);
console.log('PLATFORM_DIR: ' + platformOutDir);

module.exports = {
    context: "./app",
    entry: {
        app: "./app",
    },
    output: {
        pathinfo: true,
        libraryTarget: "commonjs2",
        filename: path.join(__dirname, platformOutDir, "bundle.js"),
    },
    resolve: {
        extensions: ["", ".js"],
        packageMains: ["main"],
        modulesDirectories: [
            "../node_modules",
        ],
        alias: tnsCoreModulesAliases(platform),
    },
    module: {
        loaders: [
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            global: 'global',
            __dirname: '__dirname'
        }),
    ]
};
