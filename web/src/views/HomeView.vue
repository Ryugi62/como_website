<template>
  <Header />

  <div class="main">
    <div class="main__left">
      <div class="main__left__title">
        <h1>최고의 퀄리티를 보장합니다.</h1>
        <h2>최고의 퀄리티를 보장합니다.</h2>
      </div>
      <div class="main__left__content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam, quia, quod voluptate voluptatem quos
          exercitationem quas voluptatibus quibusdam, quia, quod voluptate
          voluptatem quos exercitationem quas voluptatibus
        </p>
      </div>
      <div class="main__left__button">
        <button>상담신청</button>
        <button>다운로드</button>
      </div>
    </div>
    <div class="main__right">
      <!-- <img src="../assets/images/main.png" alt="main" /> -->
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
};
</script>

<style scoped>
.main {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 60px);
  background: linear-gradient(
    90deg,
    rgba(13, 12, 67, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  padding: 0 100px;
}

.main__left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
}

.main__left__title {
  margin-bottom: 20px;
}

.main__left__title h1 {
  font-size: 50px;
  font-weight: bold;
}

.main__left__title h2 {
  font-size: 30px;
  font-weight: bold;
}

.main__left__content {
  margin-bottom: 20px;
}

.main__left__button {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.main__left__button button {
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background: white;
  color: #0d0c43;
  font-weight: bold;
  cursor: pointer;
}

.main__right {
  width: 50%;
}

.main__right img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 1024px) {
  .main {
    padding: 0 50px;
  }
}

@media screen and (max-width: 768px) {
  .main {
    padding: 0 20px;
  }

  .main__left {
    width: 100%;
  }

  .main__right {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .main__left__title h1 {
    font-size: 30px;
  }

  .main__left__title h2 {
    font-size: 20px;
  }

  .main__left__content {
    font-size: 15px;
  }

  .main__left__button button {
    width: 100px;
    height: 30px;
    font-size: 10px;
  }
}

@media screen and (max-width: 320px) {
  .main__left__title h1 {
    font-size: 20px;
  }

  .main__left__title h2 {
    font-size: 15px;
  }

  .main__left__content {
    font-size: 10px;
  }

  .main__left__button button {
    width: 80px;
    height: 20px;
    font-size: 8px;
  }
}
</style>
