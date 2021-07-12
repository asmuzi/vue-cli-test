import axios from 'axios'

process.env.NODE_ENV === 'development' && localStorage.setItem('shopToken', '8566a500-6c33-4d47-b7da-a562f93fde6d1')

const http = axios.create({
  // baseURL: process.env.VUE_APP_URL, // api的base_url
  timeout: 3000, // 请求超时时间
  responseType: 'json', // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' 默认json
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Content-Type': 'multipart/form-data',
    'mg-token': localStorage.getItem('shopToken')
  },
  transformRequest: [
    // (obj, config) => {
    //   if (!config['Content-Type']) return Qs.stringify(obj)
    //   switch (config['Content-Type'].toLowerCase()) {
    //     case 'application/json;charset=utf-8': {
    //       const data = Object.assign({}, obj, {})
    //       return JSON.stringify(data)
    //     }
    //     case 'multipart/form-data;charset=utf-8': {
    //       // 上传文件
    //       return obj
    //     }
    //     case 'multipart/form-data': {
    //       // 上传文件
    //       return obj
    //     }
    //     default: {
    //       return Qs.stringify(obj)
    //     }
    //   }
    // }
  ]
})

export default http
