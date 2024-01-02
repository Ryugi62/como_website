<template>
  <section class="logout-view">
    <article class="logout-article">
      <h1 class="logout-title">로그아웃</h1>
    </article>
  </section>
</template>

<script>
export default {
  name: "LogoutView",

  created() {
    this.$store.dispatch("logout");
    this.$router.push("/");
  },
};
</script>

<style scoped></style>
