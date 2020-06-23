const plugins = []
if (process.env.NODE_ENV === 'production') {
        plugins.push('transform-remove-console')
}
module.exports = {
        presets: [
                '@vue/app', [
                        '@babel/preset-env', {
                                modules: false
                        }
                ]
        ],
        plugins: [
                [
                        'component',
                        {
                                'libraryName': 'element-ui',
                                'styleLibraryName': 'theme-chalk'
                        }
                ], ["transform-class-properties"], ...plugins
        ]
};