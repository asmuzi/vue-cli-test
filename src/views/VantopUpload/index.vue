<template>
  <div class="vantop-upload-wrapper">
    <!-- 导入按钮 -->
    <VantopUpload ref="VantopUpload" v-model="fileList" list-type="text" multiple>
      <el-button size="small" plain><i class="el-icon-upload"></i>上传附件</el-button>
    </VantopUpload>
    <!-- 打开导入弹窗 -->
    <el-button size="small" @click="handleVisible(true)">打开导入弹窗</el-button>
    <!-- 导入弹窗 -->
    <el-dialog :title="options.sceneName" :visible.sync="visible" width="600px" class="vantop-upload-dialog">
      <div class="step-1">
        <div class="head-title ">一. 下载导入模板</div>
        <div v-for="item in templateList" :key="item.id">
          <el-link :underline="false" @click="download(item)">{{ item.fileName }}</el-link>
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
  </div>
</template>

<script>
import { importDetail, exportFile, importFile, importResultGet } from './utils/file'
import VantopUpload from './components/VantopUpload.vue'
export default {
  components: {
    VantopUpload
  },
  data() {
    return {
      // 导入弹窗显示
      visible: false,
      // 导入任务状态
      importResult: null,
      // 导入场景查询
      // options: null,
      options: {
        sceneName: ''
      },
      // 导入模板列表
      templateList: [
        {
          fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
          fileName: '备货计划初始化.xlsx',
          url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx'
        }
      ],
      // fileList: [
      //   {
      //     name: 'food.jpeg',
      //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      //   },
      //   {
      //     name: 'food2.jpeg',
      //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      //   }
      // ],
      fileList: [
        {
          fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
          name: '备货计划初始化.xlsx',
          url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx'
        }
      ]
    }
  },
  computed: {
    sceneId() {
      return 'IMPORT_EXPORT_ORDER_IMPORT'
    },
    tenantId() {
      return '1596870669278'
    }
  },
  watch: {
    fileList: {
      // immediate: true,
      deep: true,
      handler(fileList) {
        console.log(fileList)
      }
    }
  },
  mounted() {
    this.importDetail()
  },
  methods: {
    handleVisible(visible) {
      this.visible = visible
    },
    // 导入场景详情
    importDetail() {
      const queryData = {
        sceneId: 'IMPORT_EXPORT_ORDER_IMPORT'
      }
      importDetail(queryData).then(res => {
        this.options = res.data.data
        // console.log(this.options)
      })
    },
    // 下载模板
    download(item) {
      const queryData = {
        ...item
      }
      exportFile(queryData)
    },
    // 导入功能按钮
    importFile() {
      const queryData = {
        importUrlList: this.fileList,
        sceneId: this.sceneId,
        tenantId: this.tenantId
      }
      importFile(queryData).then(res => {
        this.importResultGet(res.data.data)
      })
    },
    // 导入任务状态查询
    importResultGet(taskId) {
      const queryData = {
        taskId
      }
      importResultGet(queryData).then(res => {
        const result = res.data.result
        const taskTypeEnum = {
          0: '等待中',
          1: '进行中',
          2: '完成',
          3: '失败'
        }
        this.importResult = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vantop-upload-wrapper {
  .vantop-upload-dialog {
    .step-1 {
      margin-bottom: 24px;
    }
    .step-2 {
      margin-bottom: 16px;
      .import-rule-desc {
        font-size: 13px;
        font-weight: 400;
        color: #6b7280;
      }
    }
    .head-title {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
  }
}
</style>
