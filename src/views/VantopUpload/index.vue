<template>
  <div>
    <!-- 导入 -->
    <el-dialog v-if="options" :title="options.sceneName" :visible="false">
      <div>一. 下载导入模板</div>
      <div v-for="item in templateList" :key="item.id">
        <el-link :underline="false" @click="download(item)">{{ item.fileName }}</el-link>
      </div>
      <div>二. 上传文件</div>
      <div>{{ options.importRuleDesc }}</div>
      <VantopUpload ref="VantopUpload" v-model="fileList" list-type="text" multiple></VantopUpload>
      <el-button size="small" plain type="primary" @click="importFile">导入</el-button>
    </el-dialog>
    <!-- 导出 -->
    <div></div>
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
      // 导入任务状态
      importResult: null,
      // 导入场景查询
      options: null,
      // 导入模板列表
      templateList: [
        {
          fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
          fileName: '备货计划初始化.xlsx',
          url: 'http://nextop-import.oss-cn-shenzhen.aliyuncs.com/upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx'
        }
      ],
      fileList: [
        {
          fileId: 'upload/1596870669278/20210713/1414886496561512449/备货计划初始化.xlsx',
          fileName: '备货计划初始化.xlsx',
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

<style lang="scss" scoped></style>
