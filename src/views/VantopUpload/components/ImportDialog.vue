<template>
  <!-- 导入弹窗 -->
  <el-dialog :title="options.sceneName" :visible.sync="visible" width="600px" class="vantop-upload-dialog">
    <div class="step-1">
      <div class="head-title ">一. 下载导入模板</div>
      <div class="template-list-wrapper">
        <div class="step-1-text">根据提示完善表格内容</div>
        <div v-for="item in templateList" :key="item.id" class="template-list-item">
          <el-link type="primary" :underline="false" @click="download(item)">{{ item.fileName }}</el-link>
        </div>
      </div>
    </div>
    <div class="step-2">
      <div class="head-title">二. 上传文件</div>
      <div class="import-rule-desc">{{ options.importRuleDesc }}</div>
    </div>
    <VantopUpload ref="VantopUpload" v-model="fileList" list-type="text" multiple drag></VantopUpload>
    <span slot="footer">
      <el-button size="small" plain @click="handleVisible(false)">取消</el-button>
      <el-button size="small" plain type="primary" @click="importFile" :disabled="fileList.length < 1">导入</el-button>
    </span>
  </el-dialog>
</template>

<script>
import VantopUpload from './components/VantopUpload.vue'
export default {
  props: {
    templateList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    VantopUpload
  }
}
</script>

<style lang="scss" scoped></style>
