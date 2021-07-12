<template>
  <div class="auth-center">
    <list :list="list"></list>
  </div>
</template>
<script>
import List from './components/List'
import { list } from './const'
export default {
  name: 'Parent',
  components: { List },
  data() {
    return {
      list
    }
  }
}
</script>
<style lang="scss" scoped>
.auth-center {
  height: 100%;
  padding: 20px;
}
</style>
