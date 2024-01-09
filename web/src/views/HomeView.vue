<template>
  <HeaderComponent />

  <div class="home">
    <section class="container">
      <article class="text-content">
        <h2 class="text-title">
          국내에서 가장 커스터마이징 가능한 암호화폐 트레이딩 봇
        </h2>
        <p class="text-comment">
          코인을 수익화할수 있는 모든 툴을 제공하는 우리는
          <strong>코모</strong>입니다.
        </p>
        <button class="button como-button1" @click="$router.push('/register')">
          코모와 함께하기
        </button>
      </article>

      <div class="image-container">
        <img src="@/assets/img/main-bitcoin.png" />
      </div>
    </section>
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
.home {
  width: 100vw;
  display: flex;
  margin-top: 100px;
  flex-direction: column;
}

.container {
  margin: auto;
  padding: 20px;
  display: flex;
  max-width: 1440px;
}

.text-content {
  margin: auto;
  max-width: 50%;
}

.text-title {
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
}

.text-comment {
  font-size: 20px;
}

.text-comment::before {
  width: 100%;
  height: 1px;
  margin: 20px 0;
  content: "";
  display: block;
  background-color: #ffc025;
}

.text-comment strong {
  color: #ffc025;
  font-weight: bold;
}

.como-button1 {
  font-size: 20px;
}

.image-container {
  margin: auto;
}

.image-container img {
  width: 100%;
  height: auto;
  max-width: 500px;
  max-height: 500px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column-reverse;
  }

  .text-content {
    max-width: 100%;
  }

  .text-title {
    font-size: 40px;
  }

  .image-container {
    margin-top: 20px;
  }

  .image-container img {
    width: 100%;
    height: auto;
  }

  .como-button1 {
    width: 100%;
  }
}
</style>
