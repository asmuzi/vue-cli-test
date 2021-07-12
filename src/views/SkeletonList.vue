<template>
  <!-- skeleton-list -->
  <div class="skeleton-list dpf-column">
    <div class="header-filter">
      <div class="filter-left" :class="{ loading }">
        <slot name="filter-left"></slot>
      </div>
      <div class="flex-1"></div>
      <div class="filter-right" :class="{ loading }">
        <slot name="filter-right"></slot>
      </div>
    </div>
    <div class="header-form">
      <div class="form-left" :class="{ loading }">
        <slot name="form-left"></slot>
      </div>
      <div class="flex-1"></div>
      <div class="form-right">
        <slot name="form-right"></slot>
      </div>
    </div>
    <div class="header-action">
      <div class="action-left" :class="{ loading }">
        <slot name="action-left"></slot>
      </div>
      <div class="flex-1"></div>
      <div class="action-right" :class="{ loading }">
        <slot name="action-right"></slot>
      </div>
    </div>
    <div class="action-table dpf-column">
      <!-- <div> -->
      <!-- <div class="table-list">
          <div v-for="item in 10" :key="item.id" class="list-item" :class="{ loading }"></div>
        </div> -->
      <div class="table-column">
        <el-row :gutter="gutter">
          <el-col v-for="item in column" :key="item.id" :span="span">
            <div class="column-item" :class="{ loading }"></div>
          </el-col>
        </el-row>
      </div>
      <!-- </div> -->
      <div class="table-footer">
        <div class="footer-left" :class="{ loading }"></div>
        <div class="flex-1"></div>
        <div class="footer-right" :class="{ loading }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonList',
  props: {
    gutter: {
      type: Number,
      default: 24
    },
    column: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //   tableData: []
    }
  },
  computed: {
    span() {
      return 24 / this.column
    }
  }
}
</script>

<style lang="scss" scoped>
.skeleton-list {
  //   padding: 16px 20px;
  justify-content: space-between;
  .header-filter {
    display: flex;
    margin-bottom: 16px;
    .filter-left {
      min-width: 66px;
    }
    .filter-right {
      min-width: 240px;
    }
  }
  .header-form {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    .form-left {
      min-width: 600px;
    }
  }
  .header-action {
    display: flex;
    margin-top: 14px;
    margin-bottom: 14px;
    .action-left {
      min-width: 240px;
    }
    .action-right {
      min-width: 240px;
    }
  }
  .action-table {
    .table-list {
      .list-item {
        margin-bottom: 16px;
      }
    }
    .table-column {
      // display: flex;
      // justify-content: space-between;
      /deep/ .column-item {
        // flex: 1;
        // margin: 0 50px;
        // min-width: 200px;
        width: 100%;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .table-footer {
      display: flex;
      .footer-left {
        min-width: 66px;
      }
      .footer-right {
        min-width: 240px;
      }
    }
  }
}

.loading {
  min-height: 20px;
  border-radius: 2px;
  //   background-color: #f3f4f6;
  background: linear-gradient(90deg, rgba(190, 190, 190, 0.2) 25%, rgba(129, 129, 129, 0.24) 37%, rgba(190, 190, 190, 0.2) 63%);
  background-size: 400% 100%;
  -webkit-animation: ant-skeleton-loading 1.4s ease infinite;
  animation: ant-skeleton-loading 1.4s ease infinite;
}

@keyframes ant-skeleton-loading {
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
  // 0% {
  //   background-position: 100% -100%;
  // }
}
</style>
