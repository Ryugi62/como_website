<template>
  <div class="program-view">
    <HeaderComponent />
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "ProgramView",

  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped>
* {
  border: 1px solid red;
}
</style>
