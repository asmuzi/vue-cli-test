<template>
  <div class="vantop-upload">
    <el-upload
      class="upload-demo"
      :action="action"
      :headers="headers"
      :file-list="fileList"
      :auto-upload="autoUpload"
      :http-request="httpRequest"
      :on-change="change"
      :on-success="success"
      :on-error="error"
      :on-remove="remove"
      :list-type="listType"
      :show-file-list="showFileList"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </slot>
    </el-upload>
  </div>
</template>

<script>
import { importFileSingle } from '../utils/file'
export default {
  model: {
    prop: 'value'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text'
    },
    headers: {
      type: Object,
      default: () => ({
        'Content-Type': 'application/json;charset=UTF-8',
        authorization:
          // eslint-disable-next-line max-len
          'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImlhdCI6MTYyNTcyNzk1OCwiYXVkIjoibmV4dG9waXVzZXIiLCJ1aWQiOiIxIiwidGVuYW50SWQiOiIxNTk2ODcwNjY5Mjc4IiwiZXhwIjoxNjI1ODE0MzU4LCJuYmYiOjE2MjU3Mjc5NTh9.27-4pCvlFpULzaRs--t9hV2C7aYmxcZWwMwqGuijcqc'
      })
    },
    action: {
      type: String,
      // https://jsonplaceholder.typicode.com/posts/
      // default: process.env.VUE_APP_URL + '/t/file/upload'
      default: 'https://api.nextop.cc/importExportPlatform//file/import/single'
    },
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      queryData: null,
      fileList: []
    }
  },
  computed: {

  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(fileList) {
        // console.log(fileList)
        this.fileList = fileList
      }
    },
    fileList: {
      immediate: true,
      deep: true,
      handler(fileList) {
        this.$emit('input', fileList)
      }
    }
  },
  methods: {
    httpRequest() {
      // console.log(this.fileList);
      this.fileList.map(file => {
        this.queryData = null
        this.queryData = new FormData()
        this.queryData.append('file', file.raw)
        this.queryData.append('tenantId', '1596870669278')
        importFileSingle(this.queryData)
          .then(res => {
            // console.log(res);
            file.status = 'success'
            file.url = res.data.data.url
          })
          .catch(() => {
            // console.log(err)
            this.$message.error('上传失败')
            this.fileList.splice(this.fileList.length - 1, 1)
          })
      })
    },
    change(file, fileList) {
      this.fileList = fileList
    },
    success(response, file, fileList) {
      // console.log(err, file, fileList)
    },
    error(err, file, fileList) {
      // console.log(err, file, fileList)
    },
    remove(file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" scoped>
// .vantop-upload {
//
// }
</style>
