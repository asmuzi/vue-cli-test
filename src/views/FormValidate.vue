<template>
  <div>
    <form id="app" @submit="checkForm" action="https://vuejs.org/" method="post" novalidate="true">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
