<template>
  <div class="download-view">
    <HeaderComponent />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "RegisterView",

  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped></style>
