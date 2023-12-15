<template>
  <HeaderComponent />

  <main>
    <section class="hooking-section">
      <h1 class="hooking-title">
        <p class="hooking-main-title">"가격은 누구도 예측할 수 없다."</p>
        <p class="hooking-main-title">"투자에선 예측보다 대응이 중요하다."</p>
      </h1>
      <p class="hooking-subtitle">- 워렌 버핏 -</p>

      <p class="hooking-subtitle">
        코모의 트레이딩 봇으로 기술력을 경험해보세요.
      </p>
    </section>

    <section class="bot-select-section">
      <div
        class="bot-select-item"
        :class="{ active: index === activeBotIndex }"
        v-for="(bot, index) in botList"
        :key="index"
        @click="activeBotIndex = index"
      >
        <!-- <p>{{ bot }}</p> -->

        <p>{{ bot }}</p>
      </div>
    </section>

    <section class="duration-select-section">
      <h1 class="hooking-title">
        <strong>Trade Titan_binance_{{ botList[activeBotIndex] }}</strong
        >의 기간을 선택해주세요.
      </h1>

      <p class="hooking-subtitle">체험판은 회원가입후 사용하실 수 있습니다</p>

      <div class="duration-select-item">
        <div class="duration-text">
          <h2>
            바이낸스 봇 Trade Titan_binance_{{ botList[activeBotIndex] }}
            <strong>1 YEAR</strong>
          </h2>

          <p>
            ＊해당 체험판의 사용기간은 1년 이며 비트코인에 한정하여 코모의
            트레이딩봇을 써보실수 있습니다
          </p>
        </div>

        <div class="button download-button">다운로드</div>
      </div>
      <div class="duration-select-item">
        <div class="duration-text">
          <h2>
            바이낸스 봇 Trade Titan_binance_{{ botList[activeBotIndex] }}
            <strong>1 MONTH</strong>
          </h2>

          <p>
            ＊해당 체험판의 사용기간은 1달 이며 모든 코인에 대하여 코모의
            트레이딩봇을 써보실수 있습니다
          </p>
        </div>

        <div class="button download-button">다운로드</div>
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
      botList: [
        // "바이낸스 봇 (Trade Titan_binance_SPOT)",
        // "바이낸스 봇 (Trade Titan_binance_FUTURE)",
        // "바이낸스 봇 (Trade Titan_binance_UPBIT)",
        // "바이낸스 봇 (Trade Titan_binance_BITHUMB)",
        // "바이낸스 봇 (Trade Titan_binance_ARBI)",
        // "바이낸스 봇 (Trade Titan_binance_NOTICE)",
        "SPOT",
        "FUTURE",
        "UPBIT",
        "BITHUMB",
        "ARBI",
        "NOTICE",
      ],
      activeBotIndex: 1,
    };
  },
};
</script>

<style scoped>
main,
main * {
  /* border: 1px solid red; */
}

main {
  gap: 50px;
  margin: 100px auto;
  padding: 20px;
  display: flex;
  max-width: 1440px;
  flex-direction: column;
}

section {
  padding: 20px 0;
}

.hooking-section {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.hooking-title {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}
.hooking-title strong {
  color: #ffc025;
}

.hooking-main-title {
  margin: 0;
}

.hooking-subtitle {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
}

.bot-select-section {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.bot-select-item {
  width: 150px;
  height: 150px;
  cursor: pointer;
  border: 1px solid #333333;
  display: flex;
  transition: all 0.3s ease-in-out;
  text-align: center;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}
.bot-select-item:hover {
  box-shadow: 0px 0px 10px 0px #ffffff40;
  background-color: #212121;
  font-size: 1.5rem;
}

.bot-select-item.active {
  border: 1px solid;
  background-color: #333333;
  box-shadow: 0px 0px 10px 0px #ffffffbf;
  transform: scale(1.1);
  font-size: 1.6rem;
  font-weight: 700;
}

.duration-select-item {
  gap: 20px;
  display: flex;
  padding: 20px;
  border-radius: 15px;
}

.duration-text {
  gap: 20px;
  flex: 0.8;
  border: 1px solid #333333;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.duration-text strong {
  color: #ffc025;
}

.duration-text h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
}

.duration-text p {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
}

.download-button {
  flex: 0.2;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333333;
}
.download-button:hover {
  border: 1px solid #7b7b7b;
  background-color: #212121;
}
.download-button:active {
  border: 1px solid #ffffff;
  background-color: #1a1a1a;
}
</style>
