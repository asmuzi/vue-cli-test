<template>
  <div>
    <el-upload
      class="upload"
      ref="upload"
      action=""
      list-type="picture-card"
      :limit="limit"
      :accept="accept"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :file-list="fileList"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    limit: {
      type: Number
    },
    fileType: {
      type: String,
      default: 'image'
    },
    fileSize: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogImageUrl: '', // 预览地址
      dialogVisible: false, // 弹窗是否显示
      fileList: [], // 文件数组
      formData: null // formData对象
    }
  },
  created() {
    // console.log('created')
    this.fileList = [...this.list]
  },
  methods: {
    async onChange(file) {
      //   console.log('onChange')
      //   console.log(file)
      //   console.log(file.raw.type)
      const bool = this.checkFileType(file)
      if (!bool) {
        return
      }
      this.formData = new FormData()
      this.formData.append('uploadFileType', 11)
      this.formData.append('file', file.raw, file.name)
      const { code, data: res } = await this.$http.post(process.env.VUE_APP_URL + '/t/file/upload', this.formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      //   console.log(res)
      if (code === 0) {
        this.$message({
          type: 'success',
          message: '商品附件上传成功！'
        })
      }
      this.fileList.push({
        url: process.env.VUE_APP_URL + '/txcloud/' + res.data.key
      })
      this.$emit('handleResponse', this.fileList)
    },
    // 核对文件类型、大小
    checkFileType(file) {
      // 只允许上传JPG、JPEG、TIFF、RAW、BMP、GIF、PNG、MP4的商品附件
      let allowList = []
      switch (this.fileType) {
        case 'image':
          allowList = ['JPG', 'JPEG', 'RAW', 'BMP', 'GIF', 'PNG']
          break
        case 'video':
          allowList = ['MP4']
        case 'file':
          allowList = []
        default:
          break
      }
      // 文件后缀
      const suffix = file.raw.type ? file.raw.type.split('/')[1].toLocaleUpperCase() : false
      // 是否在允许上传的类型数组中
      const isAllow = allowList.includes(suffix)
      // 字节大小
      const isLtSize = this.fileSize ? file.size / 1024 <= this.fileSize : true
      if (!isAllow) {
        this.$message.error('只允许上传JPG、JPEG、TIFF、RAW、BMP、GIF、PNG、MP4的商品附件!')
        return false
      } else if (!isLtSize) {
        this.$message.error(`上传商品附件不能超过 ${this.fileSize}K !`)
        return false
      } else {
        return true
      }
    },
    beforeUpload() {
      //   console.log('beforeUpload')
      return false
    },
    handlePictureCardPreview(file) {
      //   console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file) {
      const i = this.fileList.findIndex(v => file.uid === v.uid)
      this.fileList.splice(i, 1)
      this.$emit('handleResponse', this.fileList)
    }
  },
  computed: {
    accept() {
      switch (this.fileType) {
        case 'image':
          return 'image/jpeg,image/gif,image/png'
          break
        case 'video':
          return 'video/mp4'
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
