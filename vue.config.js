var webpack = require("webpack");
const path = require("path");
const proxy = require('./proxy.config.json');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    lintOnSave: "error",
    productionSourceMap: false,
    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 8000,
        proxy: proxy,
    },
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             prependData: `@import "~@/assets/style/default.scss";`
    //         }
    //     }
    // },
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("./src"));

        // set vue-markdown-loader
        config.module
            .rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true
            })
            .end()
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons/svg'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            return {
                performance: {
                    hints: "warning",
                    maxEntrypointSize: 5000000,
                    maxAssetSize: 3000000
                }
            };
        }
    }
};
