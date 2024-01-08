<template>
  <div class="product-management">
    <h2>상품 관리</h2>
    <div class="product-management__categories">
      <!-- 각 카테고리에 대한 루프 -->
      <div
        class="product-management__category"
        v-for="(category, key) in categories"
        :key="key"
      >
        <h3>{{ category.title }}</h3>

        <!-- 카테고리의 선택 옵션을 표시하는 드롭다운 -->
        <select v-model="category.selected">
          <option value="">{{ category.title }} 선택</option>
          <option v-for="option in category.options" :key="option">
            {{ option }}
          </option>
        </select>
        <button>추가</button>
      </div>
    </div>
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
    };
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
</style>
