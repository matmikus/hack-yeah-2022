module.exports = {
    srcDir: 'src/',
    serverMiddleware: [
        { path: '/api', handler: '~/api/api.js' }
    ],
    modules: [
        '@nuxtjs/dayjs'
    ],
    build: {
        extend(config, {}) {
            config.node = {
                fs: 'empty'
            }
        }
    },
    mode: 'universal'
};
