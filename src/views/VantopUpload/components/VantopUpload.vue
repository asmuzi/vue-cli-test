<template>
  <el-upload
    ref="VantopUpload"
    action="#"
    multiple
    list-type="picture-card"
    :limit="limit"
    :auto-upload="false"
    :accept="accept"
    :show-file-list="true"
    :file-list="fileList"
    :on-change="onChange"
    :before-upload="beforeUpload"
    :http-request="httpRequest"
    :before-remove="beforeRemove"
    :on-remove="onRemove"
    :on-success="onSuccess"
    :on-exceed="onExceed"
    v-bind="$attrs"
    v-on="$listeners"
    class="el-upload-wrapper"
  >
    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
    <i slot="trigger" class="el-icon-plus"></i>
    <div>
      <el-button plain type="primary" size="small" @click="handleUpload">上传文件</el-button>
    </div>
  </el-upload>
</template>
<script>
// import { uploadFile } from '../utils/http'
export default {
  name: 'VantopUpload',
  props: {
    action: {
      type: String,
      default: 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  data() {
    return {
      accept: 'JPG、JPEG、TIFF、RAW、BMP、GIF、PNG、MP4',
      // accept: '.xls,.xlsx',
      // accept: 'JPG、JPEG、TIFF、RAW、BMP、GIF、PNG、MP4、XLS、XLSX',
      fileList: [],
      limit: 1000,
      formData: null
    }
  },
  watch: {
    fileList: {
      handler(fileList) {
        this.$emit('change', fileList)
      }
    }
  },
  methods: {
    handleUpload() {
      this.$nextTick(() => {
        this.$refs.VantopUpload.submit()
      })
    },
    httpRequest() {
      this.fileList.forEach(file => {
        // this.formData = new FormData()
        // this.formData.append('file', file.raw, file.name)
        // this.formData.append('tenantId', '1596870669278')
        this.formData = new FormData()
        this.formData.append('uploadFileType', 11)
        this.formData.append('file', file.raw, file.name)
        this.$http
          .post(process.env.VUE_APP_URL + '/t/file/upload', this.formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            console.log(res)
            this.fileList.push({
              url: process.env.VUE_APP_URL + '/txcloud/' + res.data.data.key
            })
          })
        // uploadFile(this.formData)
      })
    },
    beforeUpload() {
      return true
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onExceed() {
      this.$message.warning(`只能上传${this.limit}个文件`)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSuccess() {
      //
    },
    onRemove() {
      //
    }
  }
}
</script>
