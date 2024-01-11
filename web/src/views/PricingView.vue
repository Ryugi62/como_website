<template>
  <div>
    <HeaderComponent />
    <main class="pricing-main">
      <section class="pricing-section">
        <h1 class="section-title">Pricing</h1>

        <!-- Selections -->
        <div class="selections">
          <!-- Bot Selection -->
          <div class="selection">
            <label for="bot">봇</label>
            <select
              name="bot"
              id="bot"
              v-model="selectedBot"
              @change="clearSelections('bot')"
            >
              <option v-for="bot in botOptions" :key="bot">{{ bot }}</option>
            </select>
          </div>

          <!-- Method Selection -->
          <div class="selection">
            <label for="method">거래 방식</label>
            <select
              name="method"
              id="method"
              v-model="selectedMethod"
              @change="clearSelections('method')"
            >
              <option v-for="method in methodOptions" :key="method">
                {{ method }}
              </option>
            </select>
          </div>

          <!-- Duration Selection -->
          <div class="selection">
            <label for="duration">기간</label>
            <select
              name="duration"
              id="duration"
              v-model="selectedDuration"
              @change="clearSelections('duration')"
            >
              <option v-for="duration in durationOptions" :key="duration">
                {{ duration }}
              </option>
            </select>
          </div>
        </div>

        <!-- Grades Section -->
        <div class="grades-section">
          <div class="grade" v-for="grade in gradeOptions" :key="grade">
            <h2>{{ grade }}</h2>

            <div v-if="planDetailsAvailable(grade)">
              <p v-if="getPlanPrice(grade).discountedPrice">Original Price:</p>
              <p>
                Price:
                <template v-if="getPlanPrice(grade).discountedPrice">
                  <div class="test">
                    <del style="color: #4c4c4c; font-size: 1.5rem"
                      >{{ getPlanPrice(grade).originalPrice }} 원</del
                    >
                    <strong>
                      {{ getPlanPrice(grade).discountedPrice }} 원
                    </strong>
                  </div>
                </template>
                <template v-else>
                  <strong> {{ getPlanPrice(grade).originalPrice }} 원 </strong>
                </template>
                / 월
              </p>

              <ul>
                <li v-for="feature in getPlanFeatures(grade)" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div v-else class="placeholder">준비중입니다.</div>
            <button class="subscribe-button" v-if="planDetailsAvailable(grade)">
              구독하기
            </button>
          </div>
        </div>
      </section>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "PricingView",

  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      botOptions: [],
      methodOptions: [],
      durationOptions: [],
      gradeOptions: [],
      selectedBot: "",
      selectedMethod: "",
      selectedDuration: "",

      plans: {},
    };
  },

  computed: {
    currentPlanDetails() {
      const { selectedBot, selectedMethod, selectedDuration } = this;

      if (!selectedBot || !selectedMethod || !selectedDuration) {
        return null;
      }

      const botPlans = this.plans[selectedBot];
      if (!botPlans) return null;

      const methodPlans = botPlans[selectedMethod];
      if (!methodPlans) return null;

      return methodPlans[selectedDuration] || null;
    },
  },

  methods: {
    async fetchOptions() {
      try {
        // 각 옵션을 가져오는 로직
        const bots = await this.$store.dispatch("getAllBots");
        this.botOptions = bots.map((bot) => bot.BotName);

        const methods = await this.$store.dispatch("getAllTradeTypes");
        this.methodOptions = methods.map((method) => method.TypeName);

        const durations = await this.$store.dispatch("getAllDurations");
        this.durationOptions = durations.map((duration) => duration.Duration);

        const grades = await this.$store.dispatch("getAllGrades");
        this.gradeOptions = grades.map((grade) => grade.GradeName);

        // 기본 옵션을 0번째 index로 설정
        this.selectedBot = this.botOptions[0];
        this.selectedMethod = this.methodOptions[0];
        this.selectedDuration = this.durationOptions[0];

        // 계획 세부 정보를 가져오는 로직
        const planDetails = await this.$store.dispatch("getAllPlanDetails");

        console.log(`planDetails: ${JSON.stringify(planDetails)}`);

        this.processPlanDetails(planDetails);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },

    processPlanDetails(planDetails) {
      planDetails.forEach((detail) => {
        const { BotName, TradeType, Duration, Grade } = detail;

        if (!this.plans[BotName]) {
          this.plans[BotName] = {};
        }

        if (!this.plans[BotName][TradeType]) {
          this.plans[BotName][TradeType] = {};
        }

        if (!this.plans[BotName][TradeType][Duration]) {
          this.plans[BotName][TradeType][Duration] = {};
        }

        this.plans[BotName][TradeType][Duration][Grade] = {
          price: detail.Prices[0],
          discountAmounts: detail.discountAmounts,
          isDiscountActive: detail.isDiscountActives,
          features: detail.Features,
        };
      });
    },

    clearSelections(changedCategory) {
      if (changedCategory === "bot") {
        this.selectedMethod = this.methodOptions[0];
        this.selectedDuration = this.durationOptions[0];
      } else if (changedCategory === "method") {
        this.selectedDuration = this.durationOptions[0];
      }
    },

    planDetailsAvailable(grade) {
      return this.currentPlanDetails && this.currentPlanDetails[grade];
    },

    getPlanPrice(grade) {
      const plan = this.planDetailsAvailable(grade)
        ? this.currentPlanDetails[grade]
        : null;
      if (!plan) return "";

      console.log(`plan: ${JSON.stringify(plan)}`);

      const originalPrice = plan.price.toLocaleString();
      let discountedPrice = "";

      if (
        plan.isDiscountActive &&
        plan.discountAmounts &&
        plan.discountAmounts.length > 0
      ) {
        const discountAmount = plan.discountAmounts[0];
        discountedPrice = (plan.price - discountAmount).toLocaleString();
      }

      return plan.isDiscountActive
        ? { originalPrice, discountedPrice }
        : { originalPrice };
    },

    getPlanFeatures(grade) {
      return this.planDetailsAvailable(grade)
        ? this.currentPlanDetails[grade].features
        : [];
    },
  },

  mounted() {
    this.fetchOptions();
  },
};
</script>

<style scoped>
main {
  padding: 40px;
  margin: 50px auto;
  max-width: 1200px;
  background: #161616;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  color: #ffffff;
}

/* 섹션 제목 */
.section-title {
  font-size: 50px;
  text-align: center;
  color: #e0a527; /* 밝은 황금색 */
  margin-bottom: 40px;
}
.section-title:after {
  content: "";
  display: block;
  width: 100px;
  height: 3px;
  background: #e0a527; /* 밝은 황금색 */
  margin: 20px auto;
  margin-bottom: 80px;
}

/* 선택 영역 */
.selections {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* 그리드 간격 조정 */
  margin-bottom: 40px;
}

.selection {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selection label {
  font-size: 18px;
  margin-bottom: 10px;
}

.selection select {
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  font-size: 16px;
  background-color: #292929;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 등급 섹션 */
.grades-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* 그리드 간격 조정 */
  margin-bottom: 40px;
}

.grade {
  flex-basis: 30%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: #202020; /* 약간 밝은 배경 */
  text-align: center;
  margin-bottom: 20px;
}

.grade h2 {
  font-size: 24px;
  color: #e0a527; /* 제목 색상 */
  margin-bottom: 15px;
}

.grade p {
  font-size: 18px;
  margin-bottom: 15px;
}
.grade p:after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background: #ffffff; /* 밝은 황금색 */
  margin: 20px auto;
  margin-bottom: 20px;
}

.grade strong {
  font-size: 2rem;
}

.grade ul {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 40px;
  gap: 5px;
  display: flex;
  flex-direction: column;
}
.grade ul::after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  margin: 20px auto;
  background: #4c4c4c;
  margin-bottom: 20px;
}

.grade li {
  margin-bottom: 10px;
}

.subscribe-button {
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  background: #e0a527; /* 밝은 황금색 */
  color: #161616;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.subscribe-button:hover {
  transform: scale(1);
}
.subscribe-button:active {
  transform: scale(0.95);
}

/* 준비중인 등급에 대한 플레이스홀더 */
.placeholder {
  color: #4c4c4c;
  height: 250px;
  display: flex;
  font-size: 18px;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
}

.test {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .selections,
  .grades-section {
    grid-template-columns: 1fr;
    align-items: center;
  }

  .selection,
  .grade {
    width: 100%;
    max-width: 400px;
  }
}
</style>
