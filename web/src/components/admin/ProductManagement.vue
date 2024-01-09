<template>
  <div class="product-management">
    <h2>상품 관리</h2>
    <div class="product-management__categories">
      <!-- 카테고리 목록 -->
      <div
        class="product-management__category"
        v-for="(category, key) in categories"
        :key="key"
      >
        <h3>{{ category.title }}</h3>
        <select v-model="category.selected" :ref="key">
          <option value="">{{ category.title }} 선택</option>
          <option v-for="option in category.options" :key="option">
            {{ option }}
          </option>
        </select>
        <button @click="addCategory(category)">추가</button>
      </div>
      <!-- 상품 추가 버튼 -->
      <button class="add-plan-button" @click="addPlan">상품 추가</button>
    </div>

    <hr />

    <!-- 상품 목록 -->
    <h3>상품 목록</h3>
    <table>
      <thead>
        <tr>
          <th>상품명</th>
          <th>거래 방식</th>
          <th>기간</th>
          <th>등급</th>
          <th>가격</th>
          <th>기능</th>
          <th>수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="plan in planDetails" :key="plan.id" :id="'plan-' + plan.id">
          <td>
            <template v-if="!plan.edit">{{ plan.title }}</template>
            <template v-else>
              <select v-model="plan.title">
                <option value="">상품명 선택</option>
                <option v-for="option in categories.bot.options" :key="option">
                  {{ option }}
                </option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="!plan.edit">{{ plan.method }}</template>
            <template v-else>
              <select v-model="plan.method">
                <option value="">거래 방식 선택</option>
                <option
                  v-for="option in categories.method.options"
                  :key="option"
                >
                  {{ option }}
                </option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="!plan.edit">{{ plan.duration }}</template>
            <template v-else>
              <select v-model="plan.duration">
                <option value="">기간 선택</option>
                <option
                  v-for="option in categories.duration.options"
                  :key="option"
                >
                  {{ option }}
                </option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="!plan.edit">{{ plan.grade }}</template>
            <template v-else>
              <select v-model="plan.grade">
                <option value="">등급 선택</option>
                <option
                  v-for="option in categories.grade.options"
                  :key="option"
                >
                  {{ option }}
                </option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="!plan.edit">
              {{
                plan.price
                  .toLocaleString()
                  .split("")
                  .reverse()
                  .join("")
                  .match(/[0-9]{1,3}/g)
                  .join(",")
                  .split("")
                  .reverse()
                  .join("") + " 원"
              }}
            </template>
            <template v-else>
              <input type="number" v-model.number="plan.price" />
            </template>
          </td>
          <td class="product-management__features">
            <template v-if="!plan.edit">
              <ul>
                <li v-for="(feature, index) in plan.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </template>
            <template v-else>
              <div class="product-management__features__add">
                <input type="text" v-model="plan.newFeature" />
                <button @click="addFeature(plan)">추가</button>
              </div>
              <ul>
                <li v-for="(feature, index) in plan.features" :key="index">
                  <input type="text" v-model="plan.features[index]" />
                  <button
                    @click="removeFeature(plan, index)"
                    class="delete-button"
                  >
                    x
                  </button>
                </li>
              </ul>
            </template>
          </td>
          <td>
            <!-- 수정 버튼을 누르면 저장 / 취소 -->
            <!-- 수정 버튼 안누르면 수정 / 삭제 -->
            <template v-if="!plan.edit">
              <button @click="toggleEdit(plan)">수정</button>
              <button @click="deletePlan(plan)" class="delete-button">
                삭제
              </button>
            </template>
            <template v-else>
              <button @click="savePlan(plan)">저장</button>
              <button @click="toggleEdit(plan)" class="delete-button">
                취소
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProductManagement",

  data() {
    return {
      categories: {
        bot: {
          title: "봇",
          options: [],
          selected: "",
        },

        method: {
          title: "거래 방식",
          options: [],
          selected: "",
        },

        duration: {
          title: "기간",
          options: [],
          selected: "",
        },

        grade: {
          title: "등급",
          options: [],
          selected: "",
        },
      },

      planDetails: [],
    };
  },

  mounted() {
    this.getPlanDetailList();
    this.getBotList();
    this.getMethodList();
    this.getDurationList();
    this.getGradeList();
  },

  methods: {
    async getPlanDetailList() {
      const tempDetail = await this.$store.dispatch("getAllPlanDetails");

      tempDetail.forEach((plan, index) => {
        plan.id = index + 1;
        plan.title = plan.BotName;
        plan.method = plan.TradeType;
        plan.duration = plan.Duration;
        plan.price = plan.Prices;
        plan.grade = plan.Grade;
        plan.edit = false;
        plan.features = plan.Features;
      });

      this.planDetails = tempDetail;
    },

    async getBotList() {
      const tempBots = await this.$store.dispatch("getAllBots");

      tempBots.forEach((bot) => {
        this.categories.bot.options.push(bot.BotName);
      });
    },

    async getMethodList() {
      const tempMethods = await this.$store.dispatch("getAllTradeTypes");

      tempMethods.forEach((method) => {
        this.categories.method.options.push(method.TypeName);
      });
    },

    async getDurationList() {
      const tempDuration = await this.$store.dispatch("getAllDurations");

      tempDuration.forEach((duration) => {
        this.categories.duration.options.push(duration.Duration);
      });
    },

    async getGradeList() {
      const tempGrade = await this.$store.dispatch("getAllGrades");

      tempGrade.forEach((grade) => {
        this.categories.grade.options.push(grade.GradeName);
      });
    },

    addCategory(category) {
      const categoryName = prompt(`${category.title} 이름을 입력하세요.`);
      if (!categoryName) return;

      const isDuplicate = category.options.some((option) => {
        return option === categoryName;
      });

      if (isDuplicate) {
        alert("이미 추가된 카테고리입니다.");
        return;
      }

      category.options.push(categoryName);
      category.selected = "";
    },

    toggleEdit(plan) {
      plan.edit = !plan.edit;
    },

    savePlan(plan) {
      // object Object to 객체로 변환
      const planDetailID = JSON.parse(JSON.stringify(plan)).PlanDetailID;

      // BotName, TradeType, Duration, Grade 중복 확인
      const isDuplicate = this.planDetails.some(
        (tempPlan) =>
          tempPlan.PlanDetailID !== planDetailID &&
          tempPlan.BotName === plan.title &&
          tempPlan.TradeType === plan.method &&
          tempPlan.Duration === plan.duration &&
          tempPlan.Grade === plan.grade
      );

      if (isDuplicate) {
        alert("이미 추가된 상품입니다.");
        return;
      }

      const tempPlan = {
        PlanDetailID: planDetailID,
        BotID: this.$store.getters.getBotIDByName(plan.title),
        TradeTypeID: this.$store.getters.getTradeTypeIDByName(plan.method),
        DurationID: this.$store.getters.getDurationIDByName(plan.duration),
        GradeID: this.$store.getters.getGradeIDByName(plan.grade),
        Prices: plan.price,
        Features: plan.features,
      };

      const result = this.$store.dispatch("updatePlanDetail", tempPlan);

      if (result) {
        alert("상품이 수정되었습니다.");
        this.getPlanDetailList();
      } else {
        alert("상품 수정에 실패했습니다.");
      }
    },

    deletePlan(plan) {
      // object Object to 객체로 변환
      const planDetailID = JSON.parse(JSON.stringify(plan)).PlanDetailID;

      const result = this.$store.dispatch("deletePlanDetail", planDetailID);
      if (result) {
        alert("상품이 삭제되었습니다.");
        this.getPlanDetailList();
      } else {
        alert("상품 삭제에 실패했습니다.");
      }
    },

    async addPlan() {
      if (
        !this.categories.bot.selected ||
        !this.categories.method.selected ||
        !this.categories.duration.selected ||
        !this.categories.grade.selected
      ) {
        alert("카테고리를 모두 선택해주세요.");
        for (const category in this.categories) {
          if (!this.categories[category].selected) {
            this.$refs[category][0].focus();
            break;
          }
        }
        return;
      }

      const newPlan = {
        title: this.categories.bot.selected,
        method: this.categories.method.selected,
        duration: this.categories.duration.selected,
        grade: this.categories.grade.selected,
        id: this.planDetails.length + 1,
        price: 0,
        edit: false,
        features: [],
      };

      const isDuplicate = this.planDetails.some((plan) => {
        return (
          plan.title === newPlan.title &&
          plan.method === newPlan.method &&
          plan.duration === newPlan.duration &&
          plan.grade === newPlan.grade
        );
      });

      let scrollId = 0;

      if (!isDuplicate) {
        // BotID, TradeTypeID, DurationID, GradeID, Prices, Features
        const tempPlan = {
          BotID: this.$store.getters.getBotIDByName(newPlan.title),
          TradeTypeID: this.$store.getters.getTradeTypeIDByName(newPlan.method),
          DurationID: this.$store.getters.getDurationIDByName(newPlan.duration),
          GradeID: this.$store.getters.getGradeIDByName(newPlan.grade),
          Prices: newPlan.price,
          Features: newPlan.features,
        };

        await this.$store.dispatch("addPlanDetail", tempPlan);
        await this.getPlanDetailList();

        scrollId = newPlan.id - 1;
      } else {
        alert("이미 추가된 상품입니다.");
        scrollId = this.planDetails.find((plan) => {
          return (
            plan.title === newPlan.title &&
            plan.method === newPlan.method &&
            plan.duration === newPlan.duration &&
            plan.grade === newPlan.grade
          );
        }).id;
      }

      for (const category in this.categories) {
        this.categories[category].selected = "";
      }

      this.scrollToPlan(scrollId);

      // 만약 새로운 상품이 추가되었다면 scrollId + 1
      if (!isDuplicate) {
        this.flashPlan(scrollId + 1);
      } else {
        this.flashPlan(scrollId);
      }
    },

    editPlan(plan) {
      plan.edit = false;
    },

    scrollToPlan(planId) {
      const element = document.getElementById(`plan-${planId}`);

      if (element) {
        const y =
          element.getBoundingClientRect().top + window.pageYOffset - 200;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },

    flashPlan(planId) {
      const element = document.getElementById(`plan-${planId}`);
      if (element) {
        element.addEventListener("animationend", () => {
          element.classList.remove("flash");
        });

        element.classList.add("flash");
      }
    },

    clearCategory(category) {
      this.categories[category].selected = "";
    },

    addFeature(plan) {
      plan.features.push(plan.newFeature);
      plan.newFeature = "";
    },

    removeFeature(plan, index) {
      plan.features.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* 스타일 코드는 그대로 유지 */
.product-management {
  color: #333;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-management__categories {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
}

.product-management__category {
  min-width: 200px;
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;
  text-wrap: nowrap;
}

.product-management__category h3 {
  margin-right: 10px;
}

.product-management__category select {
  flex: 1;
  height: 30px;
  border: 1px solid #ccc;
  padding: 0 10px;
  border-radius: 5px;
  box-sizing: border-box;
}

.product-management__category button {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #005f73;
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
}

.product-management__category button:hover {
  background-color: #004c56;
}

.product-management .add-plan-button {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #005f73;
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
}

.product-management .add-plan-button:hover {
  background-color: #004c56;
}

.product-management table {
  width: 100%;
  border-collapse: collapse;
}

.product-management table th,
.product-management table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.product-management table th {
  background-color: #005f73;
  color: #fff;
}

.product-management table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.product-management table td button {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #005f73;
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
}

.product-management table td button:hover {
  background-color: #004c56;
}

.product-management__features__add {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
}

.product-management__features__add input {
  flex: 1;
  height: 30px;
  border: 1px solid #ccc;
  padding: 0 10px;
  border-radius: 5px;
  box-sizing: border-box;
}

.product-management__features__add button {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #005f73;
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
}

.product-management table td input {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
}

.product-management table td select {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
}

.product-management table td ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-management table td ul li {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 0;
}

.product-management table td ul li input {
  flex: 1;
  height: 30px;
  border: 1px solid #ccc;
  padding: 0 10px;
  border-radius: 5px;
  box-sizing: border-box;
}

.product-management table td ul li button {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #005f73;
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
}

.product-management table td ul li button:hover {
  background-color: #004c56;
}

.product-management table td span {
  display: block;
  width: 100%;
  text-align: left;
}

.product-management table td .delete-button {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
}
.product-management table td .delete-button:hover {
  background-color: #d72323;
}

.flash {
  animation: flash 2s ease-in-out;
}

@keyframes flash {
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ff7b43;
  }
  100% {
    background-color: #fff;
  }
}
</style>
