<template>
  <footer class="footer">
    <section class="footer-content">
      <article class="footer-article">
        <h1 class="footer-title">
          Start Your Bitcoin Market<br />
          With COMO <br />
        </h1>

        <input
          type="email"
          class="email-input"
          placeholder="Enter your email"
        />

        <div class="footer-links">
          <span class="footer-link">bitcoin</span>
          <span class="footer-link">how it</span>
          <span class="footer-link">subscripti</span>
          <span class="footer-link">blog</span>
          <span class="footer-link">about</span>
          <span class="footer-link">contac</span>
          <span class="footer-link">hosted</span>
          <span class="footer-link">partership</span>
          <span class="footer-link">privacy</span>
          <span class="footer-link">terms of</span>
        </div>
      </article>
      <img class="footer-image" :src="footerImage" alt="Bitcoin Illustration" />
    </section>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      footerImage: require("@/assets/img/footer-bitcoin.png"),
    };
  },
};
</script>

<style scoped>
.footer {
  padding: 30px;
  font-size: 14px;
  margin-top: 50px;
  text-align: center;
  background-color: #282828;
}

.footer-title {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.footer-content {
  margin: auto;
  display: flex;
  max-width: 1440px;
  min-height: 300px;
  align-items: center;
  justify-content: center;
}

.footer-article {
  position: relative;
  max-width: 500px;
  margin-right: 30px;
}

.email-input {
  width: 100%;
  color: white;
  height: 50px;
  border: none;
  padding-left: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
  background-color: #161616;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.footer-link {
  color: #b3b3b3;
  cursor: pointer;
  padding: 10px;
}

.footer-image {
  width: 300px;
  height: 300px;
  margin-left: 30px;
}

@media screen and (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-article {
    margin-bottom: 30px;
  }

  .footer-image {
    margin-left: 0;
  }
}
</style>
