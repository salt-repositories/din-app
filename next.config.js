import { name, version } from "./package.json";

const withSourceMaps = require("@zeit/next-source-maps")();
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const {
    NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
    SENTRY_ORG,
    SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN,
    NODE_ENV,
} = process.env

const compose = (plugins) => {
    return withSourceMaps(({
        webpack: function (config, options) {
            if (!options.isServer) {
                config.resolve.alias["@sentry/node"] = '@sentry/browser';
            }

            if (
                SENTRY_DSN &&
                SENTRY_ORG &&
                SENTRY_PROJECT &&
                SENTRY_AUTH_TOKEN &&
                NODE_ENV === "production"
            ) {
                config.plugins.push(new SentryWebpackPlugin({
                    include: '.next',
                    ignore: ['node_modules'],
                    urlPrefix: '~/_next',
                    release: `${name}@${version}`,
                }));
            }

            return plugins.reduce((config, plugin) => {
                if (plugin instanceof Array) {
                    const [_plugin, ...args] = plugin
                    plugin = _plugin(...args)
                }

                if (plugin instanceof Function) {
                    plugin = plugin()
                }

                if (plugin && plugin.webpack instanceof Function) {
                    return plugin.webpack(config, options)
                }

                return config
            }, config)
        },

        webpackDevMiddleware(config) {
            return plugins.reduce((config, plugin) => {
                if (plugin instanceof Array) {
                    const [_plugin, ...args] = plugin
                    plugin = _plugin(...args)
                }
                if (plugin instanceof Function) {
                    plugin = plugin()
                }
                if (plugin && plugin.webpackDevMiddleware instanceof Function) {
                    return plugin.webpackDevMiddleware(config)
                }
                return config
            }, config)
        },
    }));
};

const withBundleAnalyzer = require("@next/bundle-analyzer")

module.exports = compose([
    [
        withBundleAnalyzer,
        {
            enabled: process.env.ANALYZE === "true",
        },
    ],
])
