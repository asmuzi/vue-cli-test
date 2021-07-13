<template>
  <el-menu default-active="/VantopUpload" router class="el-menu">
    <!-- <el-menu-item index="/">
      <span slot="title">首页</span>
    </el-menu-item> -->
    <el-menu-item index="/VantopUpload">
      <span slot="title">VantopUpload</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  width: 200px;
  min-height: 400px;
}
</style>
