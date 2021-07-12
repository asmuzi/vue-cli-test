<template>
  <div class="upload">
    <g-upload :list="fileList" @handleResponse="handleResponse"></g-upload>
  </div>
</template>

<script>
import gUpload from '@/components/gUpload'
export default {
  components: {
    gUpload
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleResponse(response) {
      console.log(response)
      return response
    }
  }
}
</script>

<style scoped>
.upload {
  padding-top: 20px;
}
</style>
