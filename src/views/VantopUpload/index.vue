<template>
  <div>
    <!-- <el-button plain type="primary" size="small">上传文件</el-button> -->
    <VantopUpload :list="list" @handleResponse="handleResponse"></VantopUpload>
  </div>
</template>

<script>
import VantopUpload from './components/VantopUpload.vue'
export default {
  components: {
    VantopUpload
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    handleResponse(fileList) {
      console.log(fileList)
    }
  }
}
</script>

<style lang="scss" scoped></style>
