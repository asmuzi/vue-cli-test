<template>
  <div class="config-list">
    <div class="list-item" :class="[{ active: item.active }]" v-for="item in list" :key="item.id" @click.stop="handleItem(item)">
      <div class="item-head">
        <el-checkbox v-model="item.allFlag" class="head-all-flag">{{ item.groupName }}</el-checkbox>
        <span class="head-desc">{{ item.description }}</span>
        <el-switch v-model="item.openFlag" active-color="#13ce66" inactive-color="#ccc" class="head-open-flag"> </el-switch>
      </div>
      <el-collapse-transition>
        <div v-show="item.active">
          <template v-if="item.children" class="children-item">
            <template v-for="child in item.children">
              <List :key="child.id" :list="[child]"></List>
            </template>
          </template>
          <template v-else>
            <div class="item-content">
              <div class="operation-asset">操作权限</div>
              <div class="tags">
                <span v-for="item in 20" :key="item.id" class="tag">权限资源内容</span>
              </div>
              <div class="data-asset">数据权限</div>
            </div>
          </template>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleItem(item) {
      this.$set(item, 'active', !item.active)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
div {
  box-sizing: border-box;
}
.el-form-item__label,
.el-link,
.el-radio,
.el-radio__label,
.el-checkbox__label {
  line-height: 1.5;
  font-size: 13px;
}

/deep/ {
  div {
    box-sizing: border-box;
  }
  .el-form-item__label,
  .el-link,
  .el-radio,
  .el-radio__label,
  .el-checkbox__label {
    line-height: 1.5;
    font-size: 13px;
    font-weight: 400;
  }
}

.config-list {
  // height: 100%;
  // overflow: auto;
  font-size: 13px;

  /deep/ .config-list {
    padding: 0;
    padding-left: 20px;
    .list-item {
      // overflow: hidden;
      // height: 44px;
      border: 0;
      margin-bottom: 0;
      &:hover {
        box-shadow: none;
      }
      // &.active {
      //   height: auto;
      // }
    }
  }

  .list-item {
    // overflow: hidden;
    // height: 44px;
    margin-bottom: 10px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    &:hover {
      box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.06);
    }
    // &.active {
    //   height: auto;
    // }
    .item-head {
      height: 44px;
      //   line-height: 44px;
      display: flex;
      align-items: center;
      margin: 0 12px;
      border-bottom: 1px solid #e4e7ed;
      cursor: pointer;
      .head-all-flag {
        margin-right: 12px;
      }
      .head-open-flag {
        margin-left: auto;
      }
    }
    .item-content {
      //   height: 145px;
      padding: 20px 0;
      padding-left: 40px;
      .operation-asset,
      .data-asset {
        margin-bottom: 10px;
      }
      .tags {
        .tag {
          display: inline-block;
          margin: 0 48px 8px 0;
        }
      }
    }
  }
}
</style>
