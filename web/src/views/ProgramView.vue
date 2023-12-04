<template>
  <div class="program-view">
    <HeaderComponent />

    <div class="content">
      <h1 class="content-title">COMO PROGRAM의 특징</h1>

      <div class="feature-container">
        <div class="feature-explanations">
          <p
            v-for="explanation in explanations"
            :key="explanation"
            class="feature-explanation"
          >
            <i class="fas fa-check"></i>
            {{ explanation }}
          </p>
        </div>

        <div class="features">
          <div class="feature" v-for="feature in features" :key="feature.title">
            <i :class="feature.icon"></i>
            <p>{{ feature.title }}</p>
          </div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      explanations: [
        "대량의 봇을 손쉽게 구동 할 수 있습니다.",

        "모든 시장 상황에 대응이 가능합니다.",

        "DCA투자 방식으로 손실을 최소화 합니다.",

        "매매 과정이 투명합니다.",

        "백데이타를 활용해 내 투자 방식을 시뮬레이션 해볼 수 있습니다.",

        "시뮬레이션 데이타를 차트로 시각화 할 수 있습니다.",

        "예측이 아닌 대응을 전제로 합니다.",

        "시간 이벤트 매매를 대응 할 수 있습니다.",

        "텔레그램으로 실시간 매매 상황을 볼 수 있습니다.",

        "다양한 매매 전략을 적용할 수 있습니다.",

        "초보부터 고급 투자자까지 모두 케어 할 수 있는 정책을 가지고 있습니다.",

        "자금을 매우 효율적으로 관리 할 수 있습니다. (자동 볼기 투자 가능)",

        "상대방의 투자 방식을 손쉽게 적용 할 수 있습니다.",

        "1 ~ 2의 낮은 레버리지로도 충분한 수익이 가능합니다.",

        "확장성이 매우 뛰어나 타 거래소 및 DEX거래소에도 쉽게 적용 가능합니다.",

        "바이낸스 웨건을 지원하여 추가 수익을 도모 할 수 있습니다.",

        "뛰어난 파일럿을 위해 인터벤션 모드와 연습모드를 지원합니다.",
      ],

      features: [
        {
          title: "자동 거래",
          icon: "fas fa-robot",
        },
        {
          title: "추적 주문",
          icon: "fas fa-search-dollar",
        },
        {
          title: "DCA",
          icon: "fas fa-chart-line",
        },
        {
          title: "가상 거래",
          icon: "fas fa-chart-pie",
        },
        {
          title: "백테스팅",
          icon: "fas fa-chart-bar",
        },
        {
          title: "전략 디자이너",
          icon: "fas fa-palette",
        },
        {
          title: "토너먼트",
          icon: "fas fa-trophy",
        },
      ],
    };
  },
};
</script>

<style scoped>
.program-view {
  margin: auto;
  max-width: 1440px;
}

.content {
  padding: 60px 40px;
  text-align: center;
  border-radius: 10px;
}

.content-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 50px;
}
.content-title::after {
  height: 5px;
  content: "";
  display: block;
  margin-top: 40px;
  margin-bottom: 60px;
  background-color: #232323;
}

.feature-container {
  gap: 20px; /* 항목 간 간격 */
  display: flex;
  flex-wrap: wrap; /* 반응형 레이아웃 */
  align-items: flex-start; /* 항목 상단 정렬 */
  justify-content: space-around; /* 항목 간격 조절 */
}

.feature-explanations,
.features {
  flex: 1;
  min-width: 300px; /* 최소 너비 설정 */
}

.feature-explanation,
.feature {
  display: flex;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.2);
  align-items: center;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #232322;
}

.feature-explanation i,
.feature i {
  color: #ffc107; /* 금색 아이콘 */
  font-size: 1.5rem; /* 아이콘 크기 */
  margin-right: 15px;
}

@media screen and (max-width: 768px) {
  .feature-container {
    flex-direction: column;
  }

  .content-title {
    font-size: 1.8rem;
  }
}
</style>
