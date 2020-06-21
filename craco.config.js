const CracoLessPlugin = require('craco-less');
const aliyun = require('@ant-design/aliyun-theme');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: aliyun,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
