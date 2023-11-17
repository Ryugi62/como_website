<template>
  <Header />

  <div class="main">
    <div class="text-area">
      <h1 class="title">
        국내에서 가장 커스터마이징이<br />가능한 암호화폐 트레이딩 봇
      </h1>

      <p class="comment">
        <span>코</span>인을 수익화할 수 있는 <span>모</span>든 툴을 제공하는
        우리는 코모입니다.
      </p>

      <button class="btn">무료 체험 시작</button>
    </div>
    <div class="img-area">
      <img src="@/assets/img/bitcoin.png" alt="" />
    </div>
  </div>
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

<style scoped>
* {
  /* border: 1px solid red; */
}

.main {
  margin: 0 auto;
  height: calc(100vh - 101px);
  display: flex;
  padding: 0 50px;
  max-width: 1440px;
  margin-top: 101px;
  align-items: center;
  justify-content: center;
}

.text-area {
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 60px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
}

.comment {
  font-size: 20px;
  margin-bottom: 40px;
}

.comment span {
  color: #f8b700;
  font-weight: bolder;
}

.btn {
  color: #fff;
  width: 200px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  border-radius: 5px;
  background-color: #f8b700;
}
.btn:hover {
  background: #f1b100;
}
.btn:active {
  background: #e6a100;
}

.img-area {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.img-area img {
  width: 100%;
  max-width: 530px;
}

@media screen and (max-width: 768px) {
  .main {
    padding: 0 20px;
  }

  .title {
    font-size: 40px;
  }

  .comment {
    font-size: 16px;
  }

  .btn {
    width: 150px;
    height: 40px;
    font-size: 16px;
  }

  .img-area img {
    max-width: 300px;
  }
}
</style>
