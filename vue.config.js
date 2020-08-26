module.exports = {
    configureWebpack: {
        resolve:{
          extensions:[],
          alias:{
            'assets':'@/assets',
            'common':'@/common',
            'components':'@/components',
            'network':'@/network',
            'view':'@/view',
          }
        }
      },
    devServer:{
           host: '0.0.0.0',
           public:'192.168.124.9:8080',
           port: 8080,
           https: false,
           https: false,
           disableHostCheck:true,
           open: true 
        },
      
}