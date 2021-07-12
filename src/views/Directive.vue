<template>
  <div>
    <el-divider></el-divider>
    <el-button type="text" v-button>directive</el-button>
  </div>
</template>

<script>
export default {
  directives: {
    button: {
      inserted: function(el, binding) {
        el.addEventListener("click", () => {
          if (!el.disabled) {
            el.classList.add("is-disabled");
            el.setAttribute("disabled", true);
            clearTimeout(timer)
            const timer = setTimeout(() => {
              el.classList.remove("is-disabled");
              el.removeAttribute("disabled");
            }, binding.value || 3000);
          }
        });
      },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el);
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
