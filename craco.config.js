const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#faad14',
                            // '@text-color': '#000000',
                            // '@text-color-inverse': '#000000'
                            // '@font-size-base': '13px'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
