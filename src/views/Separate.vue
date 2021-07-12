<template>
  <div>
    <el-form ref="form" label-width="80px" :inline="true">
      <div v-for="(item,index) in valueList" :key="item.id" style="margin-bottom:20px;">
        <el-form-item>
          <el-radio-group v-model="item.radio" @change="change(index,item.radio)">
            <el-radio :label="0">平台统一比例</el-radio>
            <el-radio :label="4">商品单独设置</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="item.radio===4">
          <el-form-item label="店主">
            <el-input v-model="item.shopkeeper"></el-input>
          </el-form-item>
          <el-form-item label="门店">
            <el-input v-model="item.store"></el-input>
          </el-form-item>
          <el-form-item label="买家">
            <el-input v-model="item.buyer"></el-input>
          </el-form-item>
        </div>
        <div>
          <span>店主：</span><span>{{item.one}}</span>
          <span>门店：</span><span>{{item.two}}</span>
          <span>买家：</span><span>{{item.three}}</span>
          <span>卖家：</span><span>{{item.four}}</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueList: [{
        id: 1,
        radio: 4,
        shopkeeper: '',
        store: '',
        buyer: '',
        one: '',
        two: '',
        three: '',
        four: '',
        price: 100
      }, {
        id: 2,
        radio: 4,
        shopkeeper: '',
        store: '',
        buyer: '',
        one: '',
        two: '',
        three: '',
        four: '',
        price: 100
      }, {
        id: 3,
        radio: 4,
        shopkeeper: '',
        store: '',
        buyer: '',
        one: '',
        two: '',
        three: '',
        four: '',
        price: 100
      },]
    }
  },
  methods: {
    change(index, radio) { }
  },
  watch: {
    valueList: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        // console.log(newValue, oldValue);
        // console.log(newValue);
        newValue.forEach(v => {
          // v.radio = 0
          if (v.radio === 4) {
            v.one = v.price * v.shopkeeper / 100
            v.two = v.price * v.store / 100
            v.three = v.price * v.buyer / 100
            v.four = v.price - v.one - v.two - v.three
          } else {
            v.one = v.price * 2 / 100
            v.two = v.price * 3 / 100
            v.three = v.price * 4 / 100
            v.four = v.price - v.one - v.two - v.three
          }
        })
      },
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
