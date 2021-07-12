<template>
  <el-dialog :visible="true" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #footer>
      <slot name="footer">
        <el-button type="primary" size="medium">Button</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  inheritAttrs: false
}
</script>
