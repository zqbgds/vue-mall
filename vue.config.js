module.exports = {
    configureWebpack: {
        resolve: {
            // extensions: [], // 前面讲过是配置扩展名的
            alias: {
                // '@': 'src',  // 这个是默认就有的
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                // 'router': '@/router', // 一般情况下router只在main.js中引入一次所以这里没必要在配置，store也是一样
            }
        }
    }
}