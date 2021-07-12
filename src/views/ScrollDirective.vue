<template>
  <div>
    <h1 class="centered">Scroll me</h1>
    <div v-scroll="handleScroll" class="box">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque amet harum aut ab veritatis earum porro praesentium ut corporis. Quasi provident dolorem officia iure fugiat, eius mollitia sequi quisquam.</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleScroll: function(evt, el) {
      if (window.scrollY > 50) {
        el.setAttribute(
          "style",
          "opacity: 1; transform: translate3d(0, -10px, 0)"
        );
      }
      return window.scrollY > 100;
    }
  },
  directives: {
    scroll: {
      inserted: function(el, binding) {
        let f = function(evt) {
          if (binding.value(evt, el)) {
            window.removeEventListener("scroll", f);
          }
        };
        window.addEventListener("scroll", f);
      }
    }
  }
};
</script>

<style scoped>
.box {
  height: 2000px;
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
