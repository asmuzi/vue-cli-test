<template>
  <div class="flex-1">
    <div id="scroll-wrap" @click="handleClick">
      <ul class="scroll-ul">
        <li class="scroll-li" v-for="item in list" :key="item.id">
          <img :src="item.src" :data-id="item.id" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    const _this = this
    window._this = this
    setTimeout(() => {
      _this.list.push({
        id: 1,
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0bdf1e96c054d1194e6eb574688015b~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp'
      })
      _this.list.push({
        id: 2,
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0bdf1e96c054d1194e6eb574688015b~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp'
      })
      _this.list.push({
        id: 3,
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0bdf1e96c054d1194e6eb574688015b~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp'
      })
      _this.list.push({
        id: 4,
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0bdf1e96c054d1194e6eb574688015b~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp'
      })
      this.init()
    }, 3000)
  },
  methods: {
    handleClick($event) {
      console.log($event.target.dataset.id)
    },
    init() {
      this.$nextTick(() => {
        var oDiv = document.getElementById('scroll-wrap')
        var oUl = oDiv.getElementsByClassName('scroll-ul')[0]
        var aLi = oUl.getElementsByClassName('scroll-li')

        var speed = 2

        oUl.innerHTML += oUl.innerHTML

        oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px'
        aLi[0].addEventListener('click', window.handleClick)
        function move() {
          if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
            oUl.style.left = '0'
          }
          if (oUl.offsetLeft > 0) {
            oUl.style.left = -oUl.offsetWidth / 2 + 'px'
          }
          oUl.style.left = oUl.offsetLeft + speed + 'px'
        }

        var timer = setInterval(move, 30)
        oDiv.onmousemove = function() {
          clearInterval(timer)
        }
        oDiv.onmouseout = function() {
          timer = setInterval(move, 30)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

#scroll-wrap {
  width: 800px;
  height: 120px;
  margin: 100px auto;
  position: relative;
  /* background: red; */
  overflow: hidden;
}

#scroll-wrap ul {
  position: absolute;
  left: 0;
  top: 0;
}

#scroll-wrap ul li {
  float: left;
  width: 200px;
  height: 120px;
  list-style: none;
}
#scroll-wrap ul li img {
  width: 100%;
}
</style>
