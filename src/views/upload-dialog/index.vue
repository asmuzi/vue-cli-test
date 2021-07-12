<template>
  <div>
    <el-upload class="upload-demo" drag action="#" multiple :before-upload="beforeUpload" :on-change="onChange">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import {upload} from './utils/http'
export default {
  data() {
    return {
      formData: null
    }
  },
  methods: {
    beforeUpload() {
      return false
    },
    onChange(file) {
      this.formData = new FormData()
      this.formData.append('file', file.raw, file.name)
      this.formData.append('tenantId', '1596870669278')
      upload(this.formData)
    },
  }
}
</script>

<style lang="scss" scoped></style>
