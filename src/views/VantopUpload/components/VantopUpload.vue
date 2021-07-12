<template>
  <div>
    <div class="upload-file">
      <el-upload
        ref="upload"
        multiple
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :http-request="uploadFile"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 133px;" size="small" type="success" @click="submitUpload">上传到服务器 </el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过100m</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileData: new FormData(), // 文件上传数据（多文件合一）
      fileList: [] // upload多文件数组
    }
  },

  methods: {
    // 上传文件
    uploadFile(file) {
      this.fileData.append('file', file.file) // append增加数据
    },
    // 上传到服务器
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        })
      } else {
        const isLt100M = this.fileList.every(file => file.size / 1024 / 1024 < 100)
        if (!isLt100M) {
          this.$message.error('请检查，上传文件大小不能超过100MB!')
        } else {
          this.$refs.upload.submit() // 提交调用uploadFile函数
          this.fileData.append('uploadFileType', 11)
          this.$http.post(process.env.VUE_APP_URL + '/t/file/upload', this.fileData).then(response => {
            if (response.data.code === 0) {
              this.$message({
                message: '上传成功',
                type: 'success'
              })
              // this.fileList = []
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          })
        }
      }
    },

    //移除
    handleRemove(file, fileList) {
      this.fileList = fileList
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 选取文件超过数量提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    //监控上传文件列表
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
      }
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" scoped></style>
