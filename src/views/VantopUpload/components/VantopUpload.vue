<template>
  <div class="vantop-upload">
    <el-upload
      class="el-upload"
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
      :drag="drag"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot>
        <!-- <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        <div class="el-upload__text">
          <div class="text-head">
            <i class="el-icon-upload"></i>
            <span>将文件拖到此处，或<em>点击上传</em></span>
          </div>
          <div class="text-footer">支持xlsx文件 ，文件不得大于2M，数据最多1000条</div>
        </div>
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
    },
    drag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryData: null,
      fileList: []
    }
  },
  computed: {},
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
      // console.log(this.fileList)
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
.vantop-upload {
  display: flex;
  /deep/ .el-upload {
    width: 100%;
    text-align: left;
    .el-upload__text {
      width: 100%;
      .text-head {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #374151;
        font-size: 13px;
        margin-bottom: 10px;
        i {
          line-height: inherit;
          color: #4b5563;
          font-size: 22px;
          margin: 0;
          margin-right: 10px;
        }
        span {
          em {
            margin-left: 8px;
          }
        }
      }
      .text-footer {
        color: #9ca3af;
        font-size: 12px;
      }
    }
    .el-upload-dragger {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
