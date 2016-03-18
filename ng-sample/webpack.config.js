var path = require("path");
var webpack = require("webpack");


console.log('PLATFORM: ' + process.env.PLATFORM);
console.log('PLATFORM_DIR: ' + process.env.PLATFORM_DIR);

module.exports = {
    context: "./app",
    entry: {
        app: "./app",
    },
    output: {
        path: __dirname,
        pathinfo: true,
        libraryTarget: "commonjs2",
        filename: "bundle.js"
    },
    externals: [
        function(context, request, callback) {
            callback();
            //if (/browserify|crypto/.test(request)) {
                //return callback(null, "var {}");
            //} else {
                //callback();
            //}
        }
    ],
    resolve: {
        extensions: ["", ".js"],
        packageMains: ["main"],
        modulesDirectories: [
            "../node_modules",
        ],
        alias: {
            "ui/text-view": "tns-core-modules/ui/text-view/text-view.android.js",
            "ui/text-base": "tns-core-modules/ui/text-base/text-base.android.js",
            "ui/editable-text-base": "tns-core-modules/ui/editable-text-base/editable-text-base.android.js",
            "ui/core/proxy": "tns-core-modules/ui/core/proxy",
        }
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
        //new webpack.optimize.UglifyJsPlugin({
            //compress: {
                //warnings: true
            //}
        //})
    ]
};
