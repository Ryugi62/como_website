<template>
  <HeaderComponent />

  <main>
    <section class="pricing-section">
      <h1 class="section-title">Pricing</h1>

      <div class="selections">
        <!-- Bot Selection -->
        <div class="selection">
          <label for="bot">Select Bot</label>
          <select id="bot" v-model="selectedBot">
            <option v-for="bot in bots" :key="bot" :value="bot">
              {{ bot }}
            </option>
          </select>
        </div>

        <!-- Trading Method Selection -->
        <div class="selection">
          <label for="method">Trading Method</label>
          <select id="method" v-model="selectedMethod">
            <option
              v-for="method in availableMethods"
              :key="method"
              :value="method"
            >
              {{ method }}
            </option>
          </select>
        </div>

        <!-- Duration Selection -->
        <div class="selection">
          <label for="duration">Duration</label>
          <select id="duration" v-model="selectedDuration">
            <option
              v-for="duration in availableDurations"
              :key="duration"
              :value="duration"
            >
              {{ duration }}
            </option>
          </select>
        </div>
      </div>

      <!-- Grades Section -->
      <div class="grades-section">
        <div v-for="grade in grades" :key="grade" class="grade">
          <h2>{{ grade }}</h2>

          <p>
            Price:
            <strong>
              {{
                currentPlanDetails
                  ? currentPlanDetails[grade].price.toLocaleString()
                  : ""
              }}
              원
            </strong>
            / 월
          </p>

          <ul v-if="currentPlanDetails">
            <li
              v-for="feature in currentPlanDetails[grade].features"
              :key="feature"
            >
              {{ feature }}
            </li>
          </ul>

          <button class="button como-button1 buy-button">구독하기</button>
        </div>
      </div>
    </section>
  </main>

  <FooterComponent />
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
    const defaultFeatures = [
      "DCA 매매",

      "급등락 수익화 매매",

      "코모 수익화 모드 매매",

      "대량 봇 일시 가동 매매",

      "벡데이터 활용 시뮬레이션",

      "시뮬레이션 데이터 차트시각화",

      "시간 설정 매매",

      "텔레그램 알림기능",

      "모바일 조작",

      "복리매매",
    ];

    return {
      bots: [
        "바이낸스 봇",
        "업비트 봇",
        "빗썸 봇",
        "김프,아비트라지 봇",
        "공지 봇",
      ],

      methods: ["현물", "선물", "현물 + 선물"],
      durations: ["1개월", "6개월", "12개월"],
      grades: ["FREE", "BASIC", "EXPERT"],

      selectedBot: "바이낸스 봇",
      selectedMethod: "현물",
      selectedDuration: "1개월",
      selectedGrade: "FREE",

      plans: {
        "바이낸스 봇": {
          현물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          선물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          "현물 + 선물": {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },
        },

        "업비트 봇": {
          현물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          선물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          "현물 + 선물": {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },
        },

        "빗썸 봇": {
          현물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          선물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          "현물 + 선물": {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },
        },

        "김프,아비트라지 봇": {
          현물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          선물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          "현물 + 선물": {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },
        },

        "공지 봇": {
          현물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          선물: {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },

          "현물 + 선물": {
            "1개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 10000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 20000,
                features: [...defaultFeatures],
              },
            },

            "6개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 50000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 100000,
                features: [...defaultFeatures],
              },
            },

            "12개월": {
              FREE: {
                price: 0,
                features: [...defaultFeatures],
              },
              BASIC: {
                price: 90000,
                features: [...defaultFeatures],
              },
              EXPERT: {
                price: 180000,
                features: [...defaultFeatures],
              },
            },
          },
        },
      },
    };
  },

  computed: {
    availableMethods() {
      return this.plans[this.selectedBot]
        ? Object.keys(this.plans[this.selectedBot])
        : [];
    },

    availableDurations() {
      return this.selectedMethod
        ? Object.keys(this.plans[this.selectedBot][this.selectedMethod])
        : [];
    },

    currentPlanDetails() {
      if (this.selectedBot && this.selectedMethod && this.selectedDuration) {
        return this.plans[this.selectedBot][this.selectedMethod][
          this.selectedDuration
        ];
      }
      return null;
    },
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

.grade button {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 20px;
}
.grade button:active {
  transform: scale(0.95);
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
