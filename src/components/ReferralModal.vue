<template>
  <div v-if="isVisible" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span @click="closeModal" class="close">&times;</span>
      <h2>추천 프로그램 가입하기</h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="name" placeholder="이름" required />
        <input type="email" v-model="email" placeholder="이메일" required />
        <button type="submit">가입하기</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReferralModal",
  props: {
    isVisible: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* 모달 스타일 */
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6); /* 더 어두운 반투명 배경 */
}

.modal-content {
  width: 50%; /* 너비 조정 */
  margin: 10% auto;
  padding: 40px;
  max-width: 500px; /* 최대 너비 설정 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  background-color: #161616;
}

/* 텍스트 스타일 */
h2 {
  color: #ffffff;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}

/* 입력 필드 스타일 */
input[type="text"],
input[type="email"] {
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 20px;
}

/* 버튼 스타일 */
button {
  width: 100%;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s;
  border-radius: 4px;
  background-color: #0056b3;
}

button:hover {
  background-color: #004494;
}

/* 닫기 버튼 스타일 */
.close {
  float: right;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
}
</style>
