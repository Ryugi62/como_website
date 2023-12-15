<template>
  <HeaderComponent />

  <main>
    <section class="section hooking-section">
      <h1 class="title hooking-title">
        <p class="main-title">"가격은 누구도 예측할 수 없다."</p>
        <p class="main-title">"투자에선 예측보다 대응이 중요하다."</p>
      </h1>
      <p class="subtitle">- 워렌 버핏 -</p>
      <p class="description">코모의 트레이딩 봇으로 기술력을 경험해보세요.</p>
    </section>

    <section class="section bot-select-section">
      <div
        class="bot-select-item"
        :class="{ active: index === activeBotIndex }"
        v-for="(bot, index) in botList"
        :key="index"
        @click="activeBotIndex = index"
      >
        <p>{{ bot }}</p>
      </div>
    </section>

    <section class="section duration-select-section">
      <h1 class="title">
        Trade Titan_binance_{{ botList[activeBotIndex] }}의 기간을 선택해주세요.
      </h1>
      <p class="description">체험판은 회원가입후 사용하실 수 있습니다</p>
      <div
        class="duration-select-item"
        v-for="(duration, index) in durations"
        :key="index"
      >
        <div class="duration-text">
          <h2>
            바이낸스 봇 Trade Titan_binance_{{ botList[activeBotIndex] }}
            <strong>{{ duration.period }}</strong>
          </h2>
          <p>{{ duration.description }}</p>
        </div>
        <button class="button download-button">다운로드</button>
      </div>
    </section>
  </main>

  <FooterComponent />
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
  data() {
    return {
      botList: ["SPOT", "FUTURE", "UPBIT", "BITHUMB", "ARBI", "NOTICE"],
      activeBotIndex: 0,
      durations: [
        {
          period: "1 YEAR",
          description: "1년 기간 동안 비트코인 한정으로 사용 가능",
        },
        {
          period: "1 MONTH",
          description: "1달 기간 동안 모든 코인에 대해 사용 가능",
        },
      ],
    };
  },
};
</script>

<style scoped>
main {
  margin: 0 auto;
  padding: 20px;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.section {
  padding: 20px;
  text-align: center;
}

.title {
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.main-title {
  color: #e0e0e0;
  margin: 5px 0;
}

.subtitle,
.description {
  color: #cccccc;
  font-size: 18px;
  margin-top: 10px;
}

.bot-select-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.bot-select-item {
  width: 200px;
  height: 200px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  transition: all 0.3s;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #202020;
}

.bot-select-item:hover {
  transform: scale(1.05);
  background-color: #333333;
}

.bot-select-item.active {
  transform: scale(1.1);
  font-weight: bold;
  background-color: #ffc025;
  box-shadow: 0 0 10px 0 #ffc025c4;
}

.duration-select-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.duration-select-item {
  display: flex;
  flex-direction: row;
  border: 1px solid #444444;
  padding: 20px;
  border-radius: 10px;
  background-color: #202020;
}

.duration-text {
  flex-grow: 0.8;
  display: flex;
  flex-direction: column;
}

.download-button {
  color: white;
  height: auto;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  flex-grow: 0.2;
  border-radius: 5px;
  background-color: #333333;
}

.download-button:hover {
  background-color: #444444;
}

.download-button:active {
  background-color: #555555;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
  }

  .main-title,
  .subtitle,
  .description {
    font-size: 16px;
  }

  .bot-select-item {
    width: 150px;
    height: 150px;
  }

  .duration-select-item {
    flex-direction: column;
  }

  .download-button {
    width: 100%;
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 20px;
  }

  .main-title,
  .subtitle,
  .description {
    font-size: 14px;
  }

  .bot-select-section {
    justify-content: space-around;
  }

  .bot-select-item {
    width: 120px;
    height: 120px;
  }
}
</style>
