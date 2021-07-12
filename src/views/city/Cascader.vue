<template>
  <div>
    <el-button type="primary" size="medium" @click="getList">获取数据</el-button>
    <!-- <el-cascader v-model="value" :options="options" :props="props" @change="handleChange"></el-cascader> -->
    <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
  </div>
</template>

<script>
import axios from 'axios'
import { areaTree } from './tree'

export default {
  data() {
    return {
      value: [],
      options: [],
      provinceList: {},
      cityList: {},
      countyList: {}
      // props: {
      //   value: 'code',
      //   label: 'name',
      //   children: 'children'
      // }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await axios.get('/findAll.json')
      const areaList = res.data
      this.options = areaTree(areaList)
      console.log(this.options)
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
