<template>
  <div class="product-management">
    <h2>상품 관리</h2>
    <div class="product-management__categories">
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
            <template v-if="!plan.edit">{{ plan.price }}</template>
            <template v-else>
              <input type="number" v-model="plan.price" />
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
            <button @click="toggleEdit(plan)">
              {{ plan.edit ? "저장" : "수정" }}
            </button>
            <button @click="deletePlan(plan)" class="delete-button">
              삭제
            </button>
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
          options: [
            "바이낸스 봇",
            "업비트 봇",
            "빗썸 봇",
            "김프,아비트라지 봇",
            "공지 봇",
          ],
          selected: "",
        },
        method: {
          title: "거래 방식",
          options: ["현물", "선물", "현물 + 선물"],
          selected: "",
        },
        duration: {
          title: "기간",
          options: ["1개월", "6개월", "12개월"],
          selected: "",
        },
        grade: {
          title: "등급",
          options: ["FREE", "BASIC", "EXPERT"],
          selected: "",
        },
      },

      planDetails: [
        {
          id: 1,
          title: "바이낸스 봇",
          method: "현물",
          duration: "1개월",
          grade: "FREE",
          price: 0,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
        {
          id: 2,
          title: "바이낸스 봇",
          method: "현물",
          duration: "6개월",
          grade: "BASIC",
          price: 100000,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
        {
          id: 3,
          title: "바이낸스 봇",
          method: "현물",
          duration: "12개월",
          grade: "EXPERT",
          price: 200000,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
        {
          id: 4,
          title: "바이낸스 봇",
          method: "선물",
          duration: "1개월",
          grade: "FREE",
          price: 0,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
        {
          id: 5,
          title: "바이낸스 봇",
          method: "선물",
          duration: "6개월",
          grade: "BASIC",
          price: 100000,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
        {
          id: 6,
          title: "바이낸스 봇",
          method: "선물",
          duration: "12개월",
          grade: "EXPERT",
          price: 200000,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
        {
          id: 7,
          title: "바이낸스 봇",
          method: "현물 + 선물",
          duration: "1개월",
          grade: "FREE",
          price: 0,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
        {
          id: 8,
          title: "바이낸스 봇",
          method: "현물 + 선물",
          duration: "6개월",
          grade: "BASIC",
          price: 100000,
          edit: false,
          features: [
            "거래소 연동",
            "자동 매매",
            "자동 매수",
            "자동 매도",
            "엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음엄청 긴 설명 대충 엄청 긴 설명이 있을 수 있음",
          ],
        },
      ],
    };
  },

  methods: {
    // 카테고리 추가 버튼을 눌렀을 때 실행되는 메서드
    addCategory(category) {
      // 추가할 카테고리의 이름 입력받기
      const categoryName = prompt(`${category.title} 이름을 입력하세요.`);
      if (!categoryName) return;

      // 중복 여부 확인
      const isDuplicate = category.options.some((option) => {
        return option === categoryName;
      });

      // 중복된 카테고리가 없을 경우에만 추가
      if (isDuplicate) {
        alert("이미 추가된 카테고리입니다.");
        return;
      }

      // 카테고리 목록에 추가
      category.options.push(categoryName);

      // 카테고리 선택 초기화
      category.selected = "";
    },

    toggleEdit(plan) {
      plan.edit = !plan.edit;
    },

    deletePlan(plan) {
      const index = this.planDetails.findIndex((item) => item.id === plan.id);
      if (index !== -1) this.planDetails.splice(index, 1);
    },

    // 상품 추가 버튼을 눌렀을 때 실행되는 메서드
    addPlan() {
      // 모든 카테고리가 선택되었는지 확인
      if (
        !this.categories.bot.selected ||
        !this.categories.method.selected ||
        !this.categories.duration.selected ||
        !this.categories.grade.selected
      ) {
        alert("카테고리를 모두 선택해주세요.");

        // 비어있는 카테고리에 포커스를 맞춤
        for (const category in this.categories) {
          if (!this.categories[category].selected) {
            this.$refs[category][0].focus();
            break;
          }
        }

        return;
      }

      // 새로운 상품 정보 생성
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

      // 중복 상품 확인
      const isDuplicate = this.planDetails.some((plan) => {
        return (
          plan.title === newPlan.title &&
          plan.method === newPlan.method &&
          plan.duration === newPlan.duration &&
          plan.grade === newPlan.grade
        );
      });

      let scrollId = 0;

      // 중복된 상품이 없을 경우에만 추가
      if (!isDuplicate) {
        // 상품 목록에 새로운 상품 객체 추가
        this.planDetails.push(newPlan);
        scrollId = newPlan.id - 1;
      } else {
        alert("이미 추가된 상품입니다.");
        // 중복된 상품을 찾아 해당 상품의 ID를 얻음
        scrollId = this.planDetails.find((plan) => {
          return (
            plan.title === newPlan.title &&
            plan.method === newPlan.method &&
            plan.duration === newPlan.duration &&
            plan.grade === newPlan.grade
          );
        }).id;
      }

      // 카테고리 선택 초기화
      for (const category in this.categories) {
        this.categories[category].selected = "";
      }

      // 해당 상품으로 스크롤
      this.scrollToPlan(scrollId);
      this.flashPlan(scrollId);
    },

    // 스크롤 함수 추가
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
        // 애니메이션이 끝나면 다시 시작하도록 설정
        element.addEventListener("animationend", () => {
          element.classList.remove("flash");
        });

        // 애니메이션을 시작하고 속성을 초기화
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
