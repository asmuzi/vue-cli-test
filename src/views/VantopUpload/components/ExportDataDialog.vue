<template>
  <el-dialog title="导出数据" :visible="visible" @close="close" class="export-data-dialog">
    <div class="dialog-text">
      <span>本次导出共计</span>
      <span class="total"> {{ item.total || 0 }} </span>
      <span>条订单数据</span>
    </div>
    <span slot="footer">
      <el-button size="small" plain @click="close">取消</el-button>
      <el-button size="small" plain type="primary" :loading="loading" @click="exportData">导出</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { exportFile } from '../utils/file'
export default {
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        total: 0
      })
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    exportData() {
      this.loading = true
      exportFile(this.item.fileId).finally(() => {
        this.loading = false
      })
    },
    close() {
      this.handleVisible(false)
    },
    handleVisible(visible) {
      this.$emit('input', visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.export-data-dialog {
  .dialog-text {
    font-size: 14px;
    .total {
      font-weight: 400;
      color: #ef4444;
    }
  }
}
</style>
