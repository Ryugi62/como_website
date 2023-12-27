<template>
  <HeaderComponent />

  <main>
    <section class="banner">
      <h1>고객센터</h1>
    </section>

    <section class="counsel">
      <h1>바로 상담 연결</h1>
      <div class="counsel-list">
        <div
          v-for="counsel in counselList"
          :key="counsel.title"
          :class="['counsel-item', counsel.class]"
        >
          <h3>{{ counsel.title }}</h3>
          <div class="counsel-content">
            <h2>{{ counsel.content.title }}</h2>
            <button @click="connectCounsel(counsel.title)">
              바로 상담 연결
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="counsel remote-support">
      <h1>원격 기술지원</h1>
      <div class="counsel-list">
        <div class="counsel-item remote">
          <h3>원격 지원</h3>
          <div class="counsel-content">
            <h2>원격 지원을 위한 프로그램을 다운로드 받으세요.</h2>
            <button>원격 지원 프로그램 다운로드</button>
          </div>
        </div>
      </div>
    </section>

    <section class="faq">
      <h1>자주 묻는 질문</h1>

      <div class="faq-list">
        <div
          v-for="(item, index) in faqList"
          :key="item.question"
          class="faq-item"
          @click="toggleFaqItem(item)"
        >
          <h3>
            {{ `${index + 1} . ` }}
            {{ item.question }}
            <span class="faq-arrow" :class="{ 'arrow-up': item.isOpen }"
              >▼</span
            >
          </h3>
          <div class="faq-content" v-show="item.isOpen" @click.stop>
            <h2>{{ item.answer }}</h2>
          </div>
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
  name: "CounselView",

  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    return {
      counselList: [
        {
          title: "전화 상담",
          class: "call",
          content: { title: "010-1234-5678" },
        },
        { title: "카카오톡 상담", class: "kakao", content: { title: "COMO" } },
        {
          title: "이메일 상담",
          class: "email",
          content: { title: "como@test.email.com" },
        },
      ],

      faqList: [
        {
          question: "제 자금은 안전한가요?",
          answer:
            "예, 귀하의 자금은 항상 거래소에 남아 있습니다. TRADE TITAN은 API 키를 사용하여 거래소와 연결합니다. 절대 출금 권한을 요청하지 않습니다. 자세한 내용은 거래소에서 API 키를 생성하는 방법을 설명하는 튜토리얼을 읽어보시기 바랍니다.",
          isOpen: false,
        },
        {
          question: "거래를 시작하기위해 필요한 최소 자금은 얼마인가요?",
          answer:
            "필요한 최소 금액은 사용 중인 거래소와 코인에 따라 달라집니다. 대부분의 거래소에는 최소 거래량 목록이 있습니다.",
          isOpen: false,
        },
        {
          question: "계정당 여러 개의 봇을 사용할 수 있나요?",
          answer:
            "하나의 계좌에 여러 개의 트레이딩 봇을 보유할 수 있습니다. BASIC 구독시 15개의 봇 모니터링 및 구동이 가능하며 EXPERT의 경우 30개까지 가능합니다.",
          isOpen: false,
        },
        {
          question: "어떤 결제 수단을 사용할 수 있나요?",
          answer: "카드결제, 계좌입금, 가상화폐 결제가 가능합니다.",
          isOpen: false,
        },
        {
          question: "구독을 취소하려면 어떻게 해야하나요?",
          answer:
            "로그인 후 마이페이지에서 구독 취소를 누르면 구독이 취소됩니다. 구독 취소를 누르면 구독이 취소되며, 해당 구독 기간까지 사용이 가능합니다.",
          isOpen: false,
        },
        {
          question: "봇 구독을 환불 받을 수 있나요?",
          answer:
            "자동 트레이딩 봇을 설정하는 데 문제가 있는 경우 주저하지 마시고 문제 해결 가이드를 확인하거나 tradetitan119@gmail.com 으로 문의하시기 바랍니다. 구독은 구매 후 2주 이내에 환불 받을 수 있으며, 2주가 지난 후에는 환불이 불가능합니다.",
          isOpen: false,
        },
        {
          question: "프로그램 사용 기한은 어떻게 되나요?",
          answer:
            "구독기간에 따라 사용기한이 정해져 있습니다. 다만 영구적 사용을 원하실 경우 별도 상담 문의 주시면 일시불로 구매가 가능합니다.",
          isOpen: false,
        },
        {
          question: "프로그램을 구동하면서 개인 매매를 자유롭게 할 수 있나요?",
          answer:
            "Trade titan 프로그램의 가장 큰 장점은 커스터 마이징이 가능한 것입니다. 다른 회사들의 서비스와 달리 봇과 개인매매를 같이 병행할 수 있는 것이 큰 장점입니다.",
          isOpen: false,
        },
        {
          question: "사용 가능한 거래소는 무엇인가요?",
          answer:
            "현재 세계 최고의 거래소인 바이낸스 거래소에서 이용이 가능합니다. 현재 동일 트레이딩봇을 국내 거래소인 업비트와 빗썸에도 개발 중이며, 향후에는 단순 트레이딩 뿐만 아니라 아비트라지, 김프매매 등 다양한 수익화가 가능한 프로그램들을 개발 진행 중에 있습니다.",
          isOpen: false,
        },
        {
          question:
            "해당 프로그램을 사용하면 어떤 시장에서도 100% 수익을 내는 것이 가능한가요?",
          answer:
            "코모의 프로그램이 100%의 수익을 보장하지는 않습니다. 하지만 DCA, 급락 매수 등은 가장 안정된 트레이딩 매매기법이며, 해당 프로그램으로 장기간 투자했을 경우 절대 다수의 암호화폐 투자자들 보다 훨씬 우수한 수익을 낼 수 있었습니다.",
          isOpen: false,
        },
      ],
    };
  },

  methods: {
    toggleFaqItem(item) {
      item.isOpen = !item.isOpen;
    },

    connectCounsel(title) {
      console.log("Connecting to counsel with title:", title);
    },
  },
};
</script>

<style scoped>
main {
  margin: auto;
  padding: 20px;
  max-width: 1440px;
}

.banner,
.counsel,
.faq {
  margin-top: 60px;
  text-align: center;
}

.banner {
  height: 300px;
  background-color: #005f73; /* Updated color for a modern look */
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.counsel-list {
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.counsel-item,
.faq-item {
  flex: 1;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Lighter shadow for subtlety */
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.counsel-item:hover,
.faq-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

.counsel-item .counsel-content,
.faq-item .faq-content {
  margin-top: 10px;
  font-size: 18px; /* Slightly smaller font for content */
}

.faq-item .faq-content {
  width: 100%;
  color: #666; /* Softened color for content */
  padding-top: 10px;
  border-top: 1px solid #e0e0e0; /* Lighter border for separation */
}

.call,
.remote,
.email,
.kakao {
  background: #e9e9e9;
  color: #333;
}

.kakao {
  background: #fee500;
}
.email {
  background: #00bfa5;
}

.remote .counsel-content,
.remote-support .counsel-item {
  display: flex;
  flex-direction: column;
}

.counsel-item button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #222222;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.counsel-item button:hover {
  background-color: #333333; /* Darker shade on hover */
  transform: scale(1.05); /* Slight increase in size on hover */
}

.faq-arrow {
  font-size: 1.5rem; /* Larger arrow for better visibility */
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.faq {
  color: white;
}
.faq-item h3 {
  width: 100%;
}

.faq-item h2 {
  padding: 20px;
  font-size: 18px;
  text-align: left;
  margin-top: 10px;
}

.faq-item .faq-content {
  color: white;
}

.faq-item h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px; /* Increased font size for questions */
}
</style>
