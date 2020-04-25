require("dotenv").config();

const withSourceMaps = require("@zeit/next-source-maps")();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const withLess = require("@zeit/next-less");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const theme = lessToJS(
    fs.readFileSync(path.resolve(__dirname, "./assets/theme.less"), "utf8")
);

module.exports = withSourceMaps(withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: theme,
    },
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.alias["@sentry/node"] = "@sentry/browser";
        }

        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ];

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            });
        }

        config.plugins.push(
            new Dotenv({
                path: path.join(__dirname, ".env"),
                systemvars: true
            }),
        );

        const {SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, NODE_ENV} = process.env;

        if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && NODE_ENV === "production") {
            config.plugins.push(
                new SentryWebpackPlugin({
                    include: '.next',
                    ignore: ['node_modules'],
                    urlPrefix: '~/_next',
                    release: `din-app@${process.env.npm_package_version}`
                })
            );
        }

        return config
    },
}));

