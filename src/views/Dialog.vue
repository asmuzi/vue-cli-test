<template>
  <div>
    <Dialog title="标题" :visible="visible" width="30%">
      <slot>content</slot>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/gDialog.vue'
export default {
  data() {
    return {
      visible: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
