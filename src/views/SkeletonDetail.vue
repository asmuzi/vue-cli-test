<template>
  <!-- skeleton-detail -->
  <div class="skeleton-detail">
    <div class="header-title">
      <div class="header-left" :class="{ loading }"></div>
      <div class="flex-1"></div>
      <div class="header-right" :class="{ loading }"></div>
    </div>
    <div class="header-action">
      <div class="action-left" :class="{ loading }"></div>
      <div class="flex-1"></div>
      <div class="action-right" :class="{ loading }"></div>
    </div>
    <div class="detail-list" v-for="item in 2" :key="item.id">
      <div class="list-head">
        <div class="head-left" :class="{ loading }"></div>
        <div class="flex-1"></div>
        <div class="head-right"></div>
      </div>
      <div class="list-content">
        <div class="list" v-for="item in 3" :key="item.id">
          <div class="list-top" :class="{ loading }"></div>
          <div class="list-bottom" :class="{ loading }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonDetail',
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //   tableData: []
    }
  }
}
</script>

<style lang="scss" scoped>
.skeleton-detail {
  //   padding: 16px 20px;
  justify-content: space-between;
  .header-title {
    display: flex;
    .header-left {
      min-width: 66px;
      height: 10px;
      min-height: 10px;
    }
  }
  .header-action {
    display: flex;
    margin-bottom: 30px;
    .action-left {
      min-width: 344px;
    }
  }
  .detail-list {
    margin-bottom: 40px;
    .list-head {
      display: flex;
      margin-bottom: 16px;
      .head-left {
        min-width: 160px;
      }
    }
    .list-content {
      display: flex;
      justify-content: space-between;
      .list {
        flex: 1;
        // display: flex;
        // justify-content: space-between;
        &:nth-child(2) {
          margin: 0 85px;
        }
        // .list-top,
        // .list-bottom {
        // }
        .list-top {
          margin-bottom: 16px;
        }
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
