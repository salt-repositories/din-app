require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const withAntd = require("./next-antd.config");

const theme = lessToJS(
    fs.readFileSync(path.resolve(__dirname, "./assets/theme.less"), "utf8")
);

module.exports = withAntd({
    cssModules: true,
    cssLoaderOptions: {
        sourceMap: false,
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: theme,
    },
    webpack: config => {
        config.plugins.push(
            new Dotenv({
                path: path.join(__dirname, ".env"),
                systemvars: true
            }),
        );

        return config;
    },
});

