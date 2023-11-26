<template>
  <div class="home">
    <HeaderComponent />

    <div class="container">
      <h1>Home</h1>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "HomeView",

  components: {
    HeaderComponent,
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  width: calc(100% - 40px);
  height: 100%;
  margin: auto;
  max-width: 1200px;
  padding: 20px;
}
</style>
