<template>
  <HeaderComponent />

  <main class="referral-view">
    <!-- 배너 섹션 -->
    <section class="banner-section">
      <h1>추천 프로그램</h1>
      <p>
        사랑을 나누세요! 친구를 추천하고 두 분 모두 한 달 무료 혜택을 받으세요.
      </p>
      <button @click="openModal">추천 프로그램에 가입하기</button>
      <ReferralModal
        v-if="isModalVisible"
        :isVisible="isModalVisible"
        @close="isModalVisible = false"
      />
    </section>

    <!-- 추천 링크 섹션 -->
    <section class="referral-section">
      <h2>당신의 추천 링크</h2>
      <p>친구들과 추천 링크를 공유하세요.</p>
      <p class="referral-link">
        https://www.codingfactory.com/referral/123456789
      </p>
    </section>

    <!-- 사용 방법 섹션 -->
    <section class="how-to-use-section">
      <div class="step">
        <h3>1. 신청서 제출</h3>
        <p>프로그램에 참여하기 위해 신청서를 완성하고 제출하세요.</p>
      </div>
      <div class="step">
        <h3>2. 친구 초대</h3>
        <p>독특한 추천 링크를 사용하여 친구들을 초대하세요.</p>
      </div>
      <div class="step">
        <h3>3. 최대 60% 커미션 받기</h3>
        <p>성공적인 추천마다 커미션을 받으세요.</p>
      </div>
    </section>

    <!-- 추천 리스트 섹션 -->
    <section class="referral-section">
      <h2>총 커미션: {{ totalEarnings.toLocaleString() }}</h2>
      <p>당신이 초대한 친구들의 투자 내역을 확인하세요.</p>

      <!-- 추천 리스트 테이블 -->
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>투자 금액</th>
            <th>커미션</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="referral in referrals" :key="referral.id">
            <td>{{ referral.name }}</td>
            <td>{{ referral.email }}</td>
            <td>{{ referral.investedAmount.toLocaleString() }}</td>
            <td>{{ referral.commission.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <FooterComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ReferralModal from "@/components/ReferralModal.vue";

export default {
  name: "ReferralView",

  components: {
    HeaderComponent,
    FooterComponent,
    ReferralModal,
  },

  data() {
    return {
      referralLink: null,
      referrals: [
        // Sample referral data
        {
          id: 1,
          name: "John Doe",
          email: "johndoe@example.com",
          investedAmount: 100000,
          commission: 10000,
        },
        // ... additional referral objects
      ],
      totalEarnings: 0,
      isModalVisible: false,
    };
  },

  methods: {
    generateReferralLink() {
      // Method to generate a referral link
    },

    openModal() {
      this.isModalVisible = true;
    },
  },
};
</script>

<style scoped>
/* General Styles */
main {
  margin: auto;
  padding: 20px;
  max-width: 1200px;
  margin-top: 50px;
  margin-bottom: 100px;
  color: #fff; /* White text */
  font-family: "Helvetica Neue", Arial, sans-serif; /* Modern, clean font */
  background-color: #161616; /* Dark background */
  border-radius: 10px; /* Rounded corners for the container */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5); /* Enhanced shadow for depth */
}

/* Banner Section */
.banner-section {
  text-align: center;
  padding: 50px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.banner-section h1 {
  margin-bottom: 20px;
  font-size: 3em; /* Larger font size for impact */
  color: #ffc025; /* Brand color */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); /* Enhanced text shadow for depth */
}

.banner-section p {
  font-size: 1.3em;
  margin-bottom: 30px;
  opacity: 0.9; /* Slightly transparent for a subtle look */
}

.banner-section button {
  padding: 15px 30px;
  background-color: #ffc025;
  border: none;
  border-radius: 5px;
  color: #161616;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease; /* Transition for multiple properties */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Enhanced shadow for the button */
}

.banner-section button:hover {
  background-color: #e5a021;
  transform: scale(1.05); /* Scale up on hover */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6); /* Enhanced hover shadow */
}

/* Referral Section */
.referral-section {
  margin-top: 40px;
  padding: 30px;
  border-radius: 8px;
}

.referral-section h2 {
  font-size: 2.2em;
  margin-bottom: 25px;
}

.referral-section p,
.referral-link {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.referral-link {
  cursor: pointer;
  font-weight: bold;
  padding: 15px;
  background-color: black;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.referral-link:hover {
  background-color: #e5a021;
  text-decoration: underline; /* Underline on hover for emphasis */
}

/* How to Use Section Styles */
.how-to-use-section {
  gap: 20px;
  display: flex;
  padding: 20px;
  margin-top: 40px;
  border-radius: 8px;
  justify-content: space-around;
}

.how-to-use-section .step {
  flex-basis: 30%; /* Equal width for each step */
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.how-to-use-section h3 {
  color: #ffc025; /* Brand color for headers */
  margin-bottom: 10px;
  font-size: 1.5em;
}

.how-to-use-section p {
  color: #fff;
  font-size: 1.1em;
  margin-bottom: 15px; /* Consistent margin for paragraphs */
}

/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  color: #fff;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  text-align: left;
  padding: 12px;
}

th {
  text-transform: uppercase; /* Uppercase headers for a modern look */
  background-color: #111111;
}

tbody tr:nth-child(odd) {
  background-color: #262626;
}

tbody tr:hover {
  background-color: #333;
}
</style>
