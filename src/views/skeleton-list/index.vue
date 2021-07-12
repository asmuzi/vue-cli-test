<template>
  <div class="bone-box-wrapper dpf-column">
    <SkeletonList :loading="true" :column="4">
      <template #filter-left>
        header-left-design
      </template>
      <template #filter-right>
        header-right-design
      </template>
    </SkeletonList>
  </div>
</template>

<script>
import SkeletonList from '@/components/SkeletonList.vue'
export default {
  components: {
    SkeletonList
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
