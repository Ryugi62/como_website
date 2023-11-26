<template>
  <div class="home">
    <HeaderComponent />

    <div class="container">
      <h1>Home</h1>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";

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
  color: #ffffff;
  background-color: #161616;
}

.container {
  margin: auto;
  max-width: 1200px;
}
</style>
