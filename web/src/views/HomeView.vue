<template>
  <Header />

  <h1>home view</h1>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "HomeView",

  components: {
    Header,
  },

  data() {
    return {
      menu: false,
    };
  },
};
</script>

<style scoped></style>
