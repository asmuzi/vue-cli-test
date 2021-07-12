<template>
  <div class="bone-box-wrapper dpf-column">
    <BoneBox :loading="true"></BoneBox>
  </div>
</template>

<script>
import BoneBox from '@/components/BoneBox'
export default {
  components: {
    BoneBox
  },
  data() {
    return {
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 3000);
  },
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
