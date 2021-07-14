<template>
  <div class="big-data-tips">
    <div class="tips-head">
      <i class="el-icon-warning"></i>
      <span class="head-text">数据量较大，可关闭弹窗进入后台导入</span>
      <el-link type="primary" :underline="false" class="go-to" @click="goTo">
        <span>立即前往</span>
        <i class="el-icon-s-promotion"></i>
      </el-link>
    </div>
    <div class="tips-footer">可以通过 - 设置模块 / 导入导出任务 - 页面查看正在进行的任务。</div>
  </div>
</template>

<script>
export default {
  methods: {
    goTo() {
      // this.$router.push('/system/import-and-export');
      // window.open('http://local-main.nextop.cc:9000/system/import-and-export/index', '_blank')
      window.open('https://www.nextop.cc/system/import-and-export/index', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.big-data-tips {
  background: #f3f4f6;
  border-radius: 4px;
  padding: 12px 10px;
  .tips-head {
    font-size: 13px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    i {
      margin-right: 10px;
    }
    .head-text {
      font-weight: 500;
      color: #4b5563;
    }
    .go-to {
      margin-left: auto;
      font-weight: 500;
      font-size: 13px;
      color: #2563eb;
      span {
        margin-right: 4px;
      }
    }
  }
  .tips-footer {
    padding-left: 23px;
    font-weight: 500;
    color: #4b5563;
    font-size: 12px;
  }
}
</style>
