const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://fastapi-url-shortener-6zv3.onrender.com/', 
        changeOrigin: true,  
        pathRewrite: {
          '^/api': '',  
        },
        secure: false,
      },
    },
  },
})
