<template>
  <el-menu default-active="/" router class="el-menu">
    <el-menu-item index="/">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
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
