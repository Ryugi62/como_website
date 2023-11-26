<template>
  <div class="home">
    <HeaderComponent />

    <div class="container">
      <div class="container-text-zone">
        <div class="text-title">
          국내에서 가장 커스터마이징 가능한 암호화폐 트레이딩 봇
        </div>

        <div class="text-comment">
          코인을 수익화할수 있는 모든 툴을 제공하는 우리는
          <span>코모</span>입니다.
        </div>

        <div class="text-button como-button">코모와 함께하기</div>
      </div>

      <div class="container-img-zone">
        <img src="@/assets/img/graph.png" class="container-text-img" />
      </div>
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: calc(100% - 40px);
  height: 100%;
  margin: auto;
  padding: 20px;
  display: flex;
  max-width: 1440px;
}

.container-text-zone {
  margin: auto;
  max-width: 50%;
}

.text-title {
  height: fit-content;
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
}

.text-comment {
  margin: auto;
  height: fit-content;
  font-size: 20px;
}
.text-comment > span {
  color: #ffc025;
  font-weight: bold;
}

.text-button {
  color: #161616;
  padding: 15px 30px;
  font-size: 20px;
  margin-top: 30px;
}

.container-img-zone {
  margin: auto;
}

.container-text-img {
  width: 100%;
  height: 100%;
  margin: auto;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column-reverse;
  }

  .container-text-zone {
    margin: auto;
    text-align: center;
  }

  .text-title {
    font-size: 40px;
  }

  .text-comment {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .text-button {
    margin: auto;
    font-size: 15px;
  }

  .container-img-zone {
    margin: auto;
  }

  .container-text-img {
    width: 100%;
    height: 100%;
    margin: auto;
  }
}
</style>
