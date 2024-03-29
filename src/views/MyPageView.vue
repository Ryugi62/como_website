<template>
  <HeaderComponent />
  <div class="my-page">
    <div class="page-content">
      <h1 class="page-title">내 페이지</h1>
      <p>사용자 정보를 수정하고, 결제 내역을 확인하세요.</p>

      <form @submit.prevent="updateProfile" class="profile-form">
        <section class="section">
          <h2 class="section-title">개인 정보 관리</h2>
          <div class="input-group">
            <label for="email">이메일:</label>
            <input
              type="email"
              id="email"
              v-model="user.email"
              @blur="validateEmail"
              @keydown.enter.prevent
            />
            <p class="error-message" v-if="emailError">{{ emailError }}</p>
          </div>
          <div class="input-group">
            <label for="newPassword">새 비밀번호:</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              @blur="validateNewPasswordStrength"
              @keydown.enter.prevent
            />
            <p class="error-message" v-if="newPasswordError">
              {{ newPasswordError }}
            </p>
          </div>

          <div class="input-group">
            <label for="confirmNewPassword">새 비밀번호 확인:</label>
            <input
              type="password"
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              @blur="validateConfirmNewPassword"
              @keydown.enter.prevent
            />
            <p class="error-message" v-if="confirmNewPasswordError">
              {{ confirmNewPasswordError }}
            </p>
          </div>

          <div class="input-group">
            <label for="phone">전화번호:</label>
            <div class="phone-input-group">
              <input
                type="tel"
                class="phone"
                v-model="phone1"
                maxlength="3"
                @keydown.enter.prevent
                @blur="validatePhone"
              />
              <span>-</span>
              <input
                type="tel"
                class="phone"
                v-model="phone2"
                maxlength="4"
                @keydown.enter.prevent
                @blur="validatePhone"
              />
              <span>-</span>
              <input
                type="tel"
                class="phone"
                v-model="phone3"
                maxlength="4"
                @keydown.enter.prevent
                @blur="validatePhone"
              />
            </div>

            <p class="error-message" v-if="phoneError">{{ phoneError }}</p>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">현재 구독 상품</h2>
          <div class="subscription-section">
            <div
              v-if="user.subscriptions.length > 0"
              class="subscription-list-container"
            >
              <ul class="subscription-list">
                <li
                  v-for="subscription in user.subscriptions"
                  :key="subscription.id"
                  class="subscription-item"
                >
                  <div class="subscription-details">
                    <span class="subscription-name">{{
                      subscription.name
                    }}</span>
                    <span class="subscription-expires">
                      (만료일: {{ subscription.expires }})
                    </span>
                  </div>
                  <button
                    @click.prevent="endSubscription(subscription.id)"
                    class="unsubscribe-button"
                  >
                    구독 취소
                  </button>
                </li>
              </ul>
            </div>
            <div v-else class="no-subscriptions">
              <p>구독 중인 상품이 없습니다.</p>
              <RouterLink to="/pricing" class="product-link"
                >상품 보기</RouterLink
              >
            </div>
          </div>
        </section>

        <div v-if="showDeleteConfirmation" class="delete-confirmation-modal">
          <div class="modal-content">
            <h2>계정 삭제</h2>
            <p>계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            <input
              type="password"
              v-model="deletePassword"
              placeholder="현재 비밀번호 입력"
            />
            <p class="error-message" v-if="deleteError">{{ deleteError }}</p>
            <button @click.prevent="confirmDeleteAccount">삭제 확인</button>
            <button @click.prevent="showDeleteConfirmation = false">
              취소
            </button>
          </div>
        </div>

        <div class="button-container">
          <button type="submit">프로필 업데이트</button>
          <button
            @click.prevent="promptDeleteAccount"
            class="delete-account-button"
          >
            계정 삭제
          </button>
        </div>
      </form>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "MyPageView",

  components: { HeaderComponent, FooterComponent },

  data() {
    return {
      user: {
        email: "",
        password: "",
        subscriptions: [],
        phone: "",
      },
      phone1: "",
      phone2: "",
      phone3: "",
      newPassword: "",
      confirmNewPassword: "",
      confirmPassword: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: false,
      newPasswordError: "",
      confirmNewPasswordError: "",
      showDeleteConfirmation: false,
      deletePassword: "",
      deleteError: "",
      phoneError: "",
    };
  },

  mounted() {
    this.user = {
      email: this.$store.getters.userEmail,
      password: "",
      subscriptions: this.$store.getters.userSubscriptions || [],
      phone: this.$store.getters.userPhone,
    };

    if (this.user.phone) {
      const phone = this.user.phone.split("-");
      this.phone1 = phone[0];
      this.phone2 = phone[1];
      this.phone3 = phone[2];
    }
  },

  methods: {
    async updateProfile() {
      this.validateEmail();
      this.validateNewPasswordStrength();
      this.validateConfirmNewPassword();
      this.validatePhone();

      if (
        !this.emailError &&
        !this.passwordError &&
        !this.confirmPasswordError &&
        !this.newPasswordError &&
        !this.confirmNewPasswordError &&
        !this.phoneError &&
        this.user.email !== "" &&
        this.user.phone !== ""
      ) {
        // 비밀번호 변경 로직 추가
        if (this.newPassword === this.confirmNewPassword) {
          const user = {
            userId: this.$store.state.user.userId,
            email: this.user.email,
            newPassword: this.newPassword,
            phone: this.user.phone,
          };

          console.log(user);

          const result = this.$store.dispatch("changeUser", user);

          console.log(result);

          if (result) {
            alert("프로필이 업데이트되었습니다.");
          } else {
            alert("프로필 업데이트에 실패했습니다.");
          }
        } else {
          alert("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        }
        this.$router.push("/");
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    },

    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailError =
        this.user.email === ""
          ? ""
          : !emailRegex.test(this.user.email)
          ? "올바른 이메일 주소를 입력하세요."
          : "";
    },

    validateNewPasswordStrength() {
      // 비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
      this.newPasswordError =
        this.newPassword === ""
          ? ""
          : !passwordRegex.test(this.newPassword)
          ? "비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
          : "";
    },

    validateConfirmNewPassword() {
      this.confirmNewPasswordError =
        this.confirmNewPassword !== this.newPassword
          ? "비밀번호가 일치하지 않습니다."
          : "";
    },

    validatePhone() {
      const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
      const phone = `${this.phone1}-${this.phone2}-${this.phone3}`;
      this.user.phone = phone;
      this.phoneError =
        this.user.phone === ""
          ? ""
          : !phoneRegex.test(this.user.phone)
          ? "올바른 전화번호를 입력하세요."
          : "";
    },

    endSubscription(subscriptionId) {
      const index = this.user.subscriptions.findIndex(
        (s) => s.id === subscriptionId
      );
      if (index !== -1) {
        this.user.subscriptions.splice(index, 1);
        alert("구독이 취소되었습니다.");
      }
    },

    promptDeleteAccount() {
      this.showDeleteConfirmation = true;
    },

    async confirmDeleteAccount() {
      const user = {
        userId: this.$store.state.user.userId,
        password: this.deletePassword,
      };

      const result = this.$store.dispatch("deleteUser", user);

      if (result) {
        alert("계정이 삭제되었습니다.");
        this.$router.push("/");
      } else {
        this.deleteError = "계정 삭제에 실패했습니다.";
      }
    },
  },
};
</script>

<style scoped>
/* 전체 페이지 스타일 */
.my-page {
  margin: 20px auto;
  padding: 20px;
  max-width: 1440px;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #1e1e1e;
  border-radius: 10px;
  align-items: flex-start;
}

/* 페이지 제목 스타일 */
.page-title {
  color: #ffc025;
  font-size: 24px;
  margin-bottom: 20px;
}

/* 섹션 스타일 */
.section {
  flex-basis: calc(33.33% - 20px);
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: rgba(54, 54, 54, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

/* 섹션 제목 스타일 */
.section-title {
  color: #ffc025;
  font-size: 20px;
  margin-bottom: 20px;
}

/* 입력 그룹 스타일 */
.input-group {
  margin-bottom: 20px;
}
.input-group:last-child {
  margin-bottom: 0;
}

/* 라벨 스타일 */
.input-group label {
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 5px;
}

/* 입력 필드 스타일 */
.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: #1e1e1e;
  color: #ffffff;
  margin-top: 5px;
  box-sizing: border-box;
}

/* 입력 필드 포커스 스타일 */
.input-group input:focus,
.input-group select:focus {
  border-color: #ffc025;
}

.phone-input-group {
  display: flex;
  gap: 10px;
}
.phone-input-group span {
  display: flex;
  align-items: center;
}
.phone-input-group input {
  flex-grow: 1;
  max-width: 100px;
}

/* 현재 구독 상품 스타일 */
.subscription-section {
  background-color: #262626;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out;
}

/* 현재 구독 상품 스타일 (호버) */
.subscription-section:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.45);
}

/* 구독 리스트 컨테이너 스타일 */
.subscription-list-container {
  padding: 10px;
  margin-top: 10px;
}

/* 구독 아이템 스타일 */
.subscription-item {
  display: block;
  background-color: #333333;
  border: 1px solid #404040;
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
}

/* 구독 아이템 스타일 (호버) */
.subscription-item:hover {
  transform: translateY(-3px);
  background-color: #3d3d3d;
}

/* 구독 이름 스타일 */
.subscription-name {
  font-weight: bold;
  font-size: 1.1em;
  display: block;
  margin-bottom: 5px;
}

/* 만료일 스타일 */
.subscription-expires {
  color: #999999;
  font-size: 0.9em;
}

/* 구독 없음 스타일 */
.no-subscriptions {
  text-align: center;
  margin-top: 10px;
}

/* 상품 보기 링크 스타일 */
.product-link {
  color: #ffc025;
  border: 2px solid #ffc025;
  padding: 5px 10px;
  display: inline-block;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.2s, transform 0.2s;
}

/* 상품 보기 링크 스타일 (호버) */
.product-link:hover {
  background-color: #e6a609;
  transform: translateY(-2px);
  text-decoration: none;
}

/* 구독 취소 버튼 스타일 */
.unsubscribe-button {
  background-color: #d9534f;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* 구독 취소 버튼 스타일 (호버) */
.unsubscribe-button:hover {
  background-color: #c9302c;
}

/* 구독 상세 정보 스타일 */
.subscription-details {
  flex-grow: 1;
}

/* 구독 아이템 Flexbox 스타일 */
.subscription-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 버튼 컨테이너 스타일 */
.button-container {
  text-align: center;
  flex-basis: 100%;
  margin-top: 20px;
  position: relative;
}

/* 일반 버튼 스타일 */
button {
  background-color: #ffc025;
  color: #161616;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

/* 일반 버튼 스타일 (호버) */
button:hover {
  background-color: #e6a609;
}

.delete-account-button,
.delete-account-button * {
  /* border: 1px solid red; */
}

/* 계정 삭제 버튼 스타일 */
.delete-account-button {
  top: 15px;
  right: 20px;
  color: #ffc025;
  padding: 0;
  position: absolute;
  background-color: transparent;
}

/* 계정 삭제 버튼 스타일 (호버) */
.delete-account-button:hover {
  text-decoration: underline;
  background-color: transparent;
}
/* if click */
.delete-account-button:active {
  color: #e6a609;
  text-decoration: none;
}

/* 에러 메시지 스타일 */
.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 0;
}

/* 계정 삭제 확인 모달 스타일 */
.delete-confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

/* 모달 내용 스타일 */
.modal-content {
  background-color: #161616;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 90%;
  max-width: 500px;
  box-sizing: border-box;
}

/* 모달 제목 스타일 */
.modal-content h2 {
  color: #ffc025;
  margin-bottom: 15px;
}

/* 모달 내용 텍스트 스타일 */
.modal-content p {
  color: #ffffff;
  margin-bottom: 20px;
}

/* 모달 입력 필드 스타일 */
.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #333;
  background-color: #1e1e1e;
  color: #ffffff;
  border-radius: 4px;
  box-sizing: border-box;
}

/* 모달 버튼 스타일 */
.modal-content button {
  background-color: #ffc025;
  color: #161616;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

/* 모달 취소 버튼 스타일 */
.modal-content button:last-child {
  background-color: #d9534f;
  color: white;
  margin-right: 0;
}

/* 모달 버튼 스타일 (호버) */
.modal-content button:hover {
  background-color: #e6a609;
}

/* 미디어 쿼리: 작은 화면에서 섹션 100%로 설정 */
@media screen and (max-width: 767px) {
  .section {
    flex-basis: 100%;
    margin-right: 0;
  }
}
</style>
