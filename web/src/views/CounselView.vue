<template>
  <HeaderComponent />

  <main class="main-container">
    <!-- Banner Section -->
    <section class="section-banner">
      <h1 class="banner-title">고객센터</h1>
    </section>

    <!-- Counsel Section -->
    <section class="section-counsel">
      <h1 class="counsel-title">바로 상담 연결</h1>
      <div class="counsel-list">
        <div
          v-for="counsel in counselList"
          :key="counsel.title"
          class="counsel-card"
        >
          <div class="counsel-icon">{{ counsel.icon }}</div>
          <h3>{{ counsel.title }}</h3>
          <p>{{ counsel.content.title }}</p>
          <button @click="connectCounsel(counsel.title)">바로 상담 연결</button>
        </div>
      </div>
    </section>

    <!-- Remote Support Section -->
    <div class="remote-support">
      <h3>원격 지원</h3>
      <p>원격 지원을 위한 프로그램을 다운로드 받으세요.</p>
      <button>원격 지원 프로그램 다운로드</button>
    </div>

    <!-- FAQ Section -->
    <section class="faq-section">
      <h1>자주 묻는 질문</h1>
      <div class="faq-list">
        <button
          v-for="(item, index) in faqList"
          :key="item.question"
          class="faq-item"
          @click="toggleFaqItem(item)"
          :ref="`faqItem${item.question}`"
        >
          <h3>{{ `${index + 1}. ${item.question}` }}</h3>
          <div v-if="item.isOpen" class="faq-content">
            <hr />
            <p>{{ item.answer }}</p>
          </div>
        </button>
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
      // Data for counsel list
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
      // Data for FAQ list
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
      if (item.isOpen) {
        this.$nextTick(() => {
          this.scrollToView(this.$refs[`faqItem${item.question}`]);
        });
      }
      this.faqList = this.faqList.map((faq) =>
        faq.question === item.question ? item : faq
      );
    },
    scrollToView(element) {
      if (element && element.length > 0) {
        const elementRect = element[0].getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle =
          absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;
        window.scrollTo({ top: middle, behavior: "smooth" });
      }
    },
    connectCounsel(title) {
      switch (title) {
        case "전화 상담":
          window.open("tel:010-1234-5678");
          break;
        case "카카오톡 상담":
          window.open("https://pf.kakao.com/_xkxkxkxk");
          break;
        case "이메일 상담":
          window.open("mailto:xorjf1027@naver.com");
          break;
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  margin: auto;
  padding: 20px;
  max-width: 1200px;
  background-color: #161616;
  color: #fff;
}

.section-banner {
  background-color: #ffc025;
  text-align: center;
  margin-top: 30px;
  padding: 80px 0;
  border-radius: 8px;
  margin-bottom: 30px;
  color: #333;
}

.section-banner h1 {
  font-size: 1.7em;
}

.section-counsel,
.faq-section {
  margin-bottom: 30px;
}

.counsel-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.counsel-card {
  background: #222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.3s ease;
}

.counsel-card:hover {
  transform: translateY(-5px);
}

.remote-support {
  background-color: #222;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.faq-section h1 {
  text-align: center;
  margin-bottom: 20px;
}

.faq-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.faq-item {
  background: #333;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.faq-content {
  margin-top: 10px;
  text-align: left;
  color: #aaa;
}

.faq-item h3 {
  text-align: left;
  margin-bottom: 10px;
}

.faq-content hr {
  border: none;
  margin-bottom: 20px;
  border-bottom: 1px solid #aaa;
}

button {
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  background-color: #444;
}

button:hover {
  background-color: #555;
}
</style>
