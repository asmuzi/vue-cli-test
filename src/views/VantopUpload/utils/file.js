import axios from 'axios'

const instance = axios.create({
  headers: {
    timeout: 3000,
    'Content-Type': 'application/json;charset=UTF-8',
    authorization:
      // eslint-disable-next-line max-len
      'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImlhdCI6MTYyNTcyNzk1OCwiYXVkIjoibmV4dG9waXVzZXIiLCJ1aWQiOiIxIiwidGVuYW50SWQiOiIxNTk2ODcwNjY5Mjc4IiwiZXhwIjoxNjI1ODE0MzU4LCJuYmYiOjE2MjU3Mjc5NTh9.27-4pCvlFpULzaRs--t9hV2C7aYmxcZWwMwqGuijcqc'
  }
})

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    console.log(error)
    return Promise.reject(error)
  }
)

const baseUrl = 'https://api.nextop.cc'
const prefix = baseUrl + '/importExportPlatform'

// 导入场景详情
export const importDetail = params => instance.post(prefix + '/import/detail', params)

// 文件导出
export const exportFile = params =>
  instance
    .get(prefix + '/file/download?fileId=' + params.fileId, params, {
      responseType: 'blob'
    })
    .then(res => {
      downBuffer(res, params.filename)
    })

// 通过 a 标签实现下载
export const downloadFile = (url, filename) => {
  let a = document.createElement('a')
  a.href = url
  a.download = decodeURI(filename)
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// 接口返回文件流
export const downBuffer = (res, filename) => {
  let blob = new Blob([res])
  let blobURL = window.URL.createObjectURL(blob)
  // 下载处理
  // 下载处理
  const resultName =
    filename || 'content-disposition' in res.headers
      ? decodeURIComponent(
          res.headers['content-disposition']
            .split(';')[1]
            .split('=')[1]
            .replace(/"/g, '')
        )
      : '下载文件'

  downloadFile(blobURL, resultName)
  window.URL.revokeObjectURL(blobURL)
}

// 导入功能按钮
export const importFile = params => instance.post(prefix + '/import', params)

// 单文件上传
export const importFileSingle = params => instance.post(prefix + '/file/import/single', params)

// 多文件上传
export const importFileList = params => instance.post(prefix + '/file/import/list', params)

// 导入任务状态查询
export const importResultGet = params => instance.get(prefix + '/importTask/get?taskId=' + params.taskId, params)
