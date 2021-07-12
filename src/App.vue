<template>
  <div class="app">
    <SideBar></SideBar>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/layouts/SideBar.vue'
export default {
  name: 'app',
  components: {
    SideBar
  }
}
</script>

<style lang="scss">
html,
body,
.app {
  overflow: hidden;
  height: 100%;
}
.app {
  display: flex;
  .app-content {
    flex: 1;
  }
}
</style>
