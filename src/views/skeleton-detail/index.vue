<template>
  <div class="bone-box-wrapper dpf-column">
    <SkeletonDetail :loading="true"></SkeletonDetail>
  </div>
</template>

<script>
import SkeletonDetail from '@/components/SkeletonDetail.vue'
export default {
  components: {
    SkeletonDetail
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
// .bone-box-wrapper {
//   flex: 1;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
// }
</style>
