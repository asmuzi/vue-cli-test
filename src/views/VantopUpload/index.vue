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
        <div class="template-list-wrapper">
          <div class="step-1-text">根据提示完善表格内容</div>
          <div v-for="item in options.importUrlMappingList" :key="item.id" class="template-list-item">
            <el-link type="primary" :underline="false" @click="downloadTemplate(item)">{{ item.fileName }}</el-link>
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
    <!-- 正在导入 & 导入结果 弹窗 -->
    <el-dialog :title="importingDialogTitle" :visible.sync="importingVisible" width="600px" class="importing-dialog">
      <div class="importing-file-list">
        <div class="list-item" v-for="item in importResultList" :key="item.id" :class="statusMap[item.status]">
          <i :class="`el-icon-${statusIconMap[item.status]}`"></i>
          <el-tooltip :disabled="!item.name" class="file-name" effect="dark" :content="item.fileName" placement="top">
            <span>{{ item.fileName || '-' }}</span>
          </el-tooltip>
          <template v-if="item.status === 3">
            <div class="file-status-text">
              <span class="error">{{ item.result }}</span>
              <!-- <span>{{ item.statusText.split('，')[0] }}</span>
              <span>，</span>
              <span class="error">{{ item.statusText.split('，')[1] }}</span> -->
              <i class="el-icon-download" @click="exportData(item)"></i>
            </div>
          </template>
          <div v-else class="file-status-text">{{ item.result }}</div>
        </div>
      </div>
      <BigDataTips v-if="importing"></BigDataTips>
      <span slot="footer">
        <el-button :disabled="importing" size="small" plain @click="handleImportAgain">继续导入</el-button>
        <el-button :disabled="importing" size="small" plain type="primary" @click="handleImportingVisible(false)">完成</el-button>
      </span>
    </el-dialog>
    <ExportDataDialog v-if="exportDataVisible" v-model="exportDataVisible" :item="exportDataItem"></ExportDataDialog>
  </div>
</template>

<script>
// const taskTypeEnum = {
//   0: '等待中',
//   1: '进行中',
//   2: '完成',
//   3: '失败'
// }

import { importDetail, importFile, importResultGet, downloadFile } from './utils/file'
import VantopUpload from './components/VantopUpload.vue'
import BigDataTips from './components/BigDataTips.vue'
import ExportDataDialog from './components/ExportDataDialog.vue'
export default {
  components: {
    VantopUpload,
    BigDataTips,
    ExportDataDialog
  },
  // provide() {
  //   return {
  //     Admin: this
  //   }
  // },
  data() {
    return {
      timer: null,
      // 导出数据当前操作项
      exportDataItem: {
        total: 0
      },
      // 是否为正在导入
      importing: false,
      // 当前操作类型
      // handleType: '',
      // 导出数据弹窗
      exportDataVisible: false,
      // 正在导入弹窗
      importingVisible: false,
      // 导入弹窗显示
      visible: false,
      statusMap: {
        0: 'wait',
        1: 'loading',
        2: 'success',
        3: 'error'
      },
      statusIconMap: {
        0: 'info',
        1: 'loading',
        2: 'success',
        3: 'error'
      },
      // 导入任务状态列表
      importResultList: [
        {
          errorFileUrl: null,
          fileName: 'fileName',
          result: '等待中',
          status: 0
        },
        {
          errorFileUrl: null,
          fileName: 'fileName',
          result: '进行中',
          status: 1
        },
        {
          errorFileUrl: null,
          fileName: 'fileName',
          result: '完成',
          status: 2
        },
        {
          errorFileUrl: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
          fileName: 'fileName',
          result: '失败',
          status: 3
        }
      ],
      // 导入场景查询
      // options: null,
      options: {
        sceneName: '',
        // 导入模板列表
        importUrlMappingList: [
          // {
          //   fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
          //   fileName: '备货计划初始化.xlsx',
          //   url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx'
          // },
          // {
          //   fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
          //   fileName: '备货计划初始化.xlsx',
          //   url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx'
          // }
        ]
      },
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
        // {
        //   fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
        //   name: '备货计划初始化.xlsx',
        //   url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
        //   statusText: '成功导入300条数据',
        //   status: 'success'
        // },
        // {
        //   fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
        //   name: '备货计划初始化.xlsx',
        //   url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
        //   statusText: '共4000条数据，失败30条数据',
        //   status: 'error',
        //   total: '3,345'
        // },
        // {
        //   fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
        //   name: '备货计划初始化.xlsx',
        //   url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
        //   statusText: '正在处理…',
        //   status: 'loading'
        // }
      ]
    }
  },
  computed: {
    importingDialogTitle() {
      return this.importing ? '正在导入' : '导入结果'
    },
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
        // console.log(fileList)
      }
    }
  },
  mounted() {
    this.importDetail()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    exportData(item) {
      downloadFile(item.errorFileUrl)
      // this.exportDataItem = item
      // const queryData = {
      //   exportCountForm: {
      //     conditionStr: ''
      //   },
      //   sceneId: this.sceneId
      // }
      // exportCount(queryData).then(res => {
      //   console.log(res)
      // })
    },
    handleImportingVisible(visible) {
      this.fileList = []
      this.importingVisible = visible
    },
    handleImportAgain() {
      this.handleImportingVisible(false)
    },
    handleVisible(visible) {
      this.visible = visible
    },
    // 导入场景详情
    importDetail() {
      const queryData = {
        sceneId: 'IMPORT_EXPORT_ORDER_IMPORT'
      }
      importDetail(queryData).then(res => {
        // console.log(res);
        // this.importUrlMappingList = res.data.data.importUrlMappingList
        this.options = res.data.data
        // console.log(this.options)
      })
    },
    // 下载模板
    downloadTemplate(item) {
      // const queryData = {
      //   ...item
      // }
      downloadFile(item.url)
      // exportFile(queryData)
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
        this.importingVisible = true
        this.importResultList = res.data.data
        // console.log(this.importResultList);
        this.importing = this.importResultList.some(v => v.status === 1)
        if (this.importing) {
          if (this.timer) {
            clearInterval(this.timer)
          }
          this.timer = setInterval(() => {
            this.importResultGet(taskId)
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vantop-upload-wrapper {
  // 导入弹窗
  .vantop-upload-dialog {
    .step-1 {
      margin-bottom: 24px;
      .template-list-wrapper {
        display: flex;
        align-items: center;
        font-size: 13px;
        .step-1-text {
          font-weight: 400;
          color: #6b7280;
        }
        .template-list-item {
          padding: 0 8px;
          border-right: 1px solid #d1d5db;
          &:first-child,
          &:last-child {
            border: 0;
          }
          .el-link {
            font-weight: 400;
            color: #2563eb;
            font-size: 13px;
          }
        }
      }
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
  // 正在导入弹窗
  .importing-dialog {
    .importing-file-list {
      // display: flex;
      // align-items: center;
      margin-bottom: 24px;
      .list-item {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 13px;
        padding: 6px 4px;
        &.success {
          i {
            color: #22c55e;
          }
        }
        &.error {
          i {
            color: #ef4444;
          }
        }
        &.loading {
          i {
            color: #3377ff;
          }
        }
        &.loading {
          background: #f3f4f6;
          border-radius: 4px;
        }
        i {
          margin-right: 8px;
        }
        .file-status-text {
          margin-left: auto;
          display: flex;
          align-items: center;
          .error {
            color: #ef4444;
          }
          i {
            cursor: pointer;
            color: #6b7280;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
