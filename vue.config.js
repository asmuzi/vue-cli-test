module.exports = {
  devServer: {
    proxy: {
      '/t': {
        target: 'https://t-youpin.quanhoo.cn', // 测试服务器
        changOrigin: true
      },
      '/file': {
        // target: 'http://10.5.1.57:8080',
        target: 'https://api.nextop.cc',
        changOrigin: true
      }
    }
  }
}
