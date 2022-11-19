module.exports = {
    srcDir: 'src/',
    serverMiddleware: [
        { path: '/api', handler: '~/api/api.js' }
    ],
    modules: [
        '@nuxtjs/dayjs'
    ]
};
