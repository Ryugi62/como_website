<template>
  <div class="header">
    <i class="fa fa-line-chart"></i>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.header {
  top: 0;
  width: 100%;
  padding: 20px 0;
  position: sticky;

  max-width: 1200px;
  margin: auto;
}

.header i {
  font-size: 30px;
}
</style>
