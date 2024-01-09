<template>
  <section class="registration-section">
    <!-- 이미지 컨테이너 -->
    <div class="image-container">
      <img src="@/assets/img/register-bitcoin.png" alt="Registration Image" />
    </div>

    <!-- 등록 양식 -->
    <article class="registration-article">
      <form @submit.prevent="handleRegistration" class="registration-form">
        <h1 class="form-title">Register</h1>
        <p class="form-description">Create your new account</p>

        <!-- 아이디 입력 필드 -->
        <div class="input-wrapper">
          <label for="userId">Choose a userId</label>
          <input
            id="userId"
            v-model="userId"
            type="text"
            class="input-field"
            placeholder="User ID"
            @blur="validateUserId"
          />
          <span
            v-if="userIdMessage"
            class="message"
            :class="{ error: !isUserIdValid }"
            >{{ userIdMessage }}</span
          >
        </div>

        <!-- 이메일 입력 필드 -->
        <div class="input-wrapper">
          <label for="email">Enter your email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input-field"
            placeholder="Email"
            @blur="validateEmail"
          />
          <span
            v-if="emailMessage"
            class="message"
            :class="{ error: !isEmailValid }"
            >{{ emailMessage }}</span
          >
        </div>

        <!-- 비밀번호 입력 필드 -->
        <div class="input-wrapper">
          <label for="password">Choose a password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input-field"
            placeholder="Password"
            @blur="validatePassword"
          />
          <span
            v-if="passwordMessage"
            class="message"
            :class="{ error: !isPasswordValid }"
            >{{ passwordMessage }}</span
          >
        </div>

        <!-- 비밀번호 확인 입력 필드 -->
        <div class="input-wrapper">
          <label for="confirm-password">Confirm your password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            class="input-field"
            placeholder="Confirm Password"
            @blur="validateConfirmPassword"
          />
          <span
            v-if="confirmPasswordMessage"
            class="message"
            :class="{ error: !isConfirmPasswordValid }"
            >{{ confirmPasswordMessage }}</span
          >
        </div>

        <!-- 전화번호 입력 필드 -->
        <div class="input-wrapper">
          <label for="phone">Enter your phone number</label>
          <div class="phone-input">
            <input
              id="phone1"
              v-model="phone1"
              type="tel"
              class="input-field"
              placeholder="XXX"
              @blur="validatePhone"
            />
            <span>-</span>
            <input
              id="phone2"
              v-model="phone2"
              type="tel"
              class="input-field"
              placeholder="XXXX"
              @blur="validatePhone"
            />
            <span>-</span>
            <input
              id="phone3"
              v-model="phone3"
              type="tel"
              class="input-field"
              placeholder="XXXX"
              @blur="validatePhone"
            />
          </div>
          <span
            v-if="phoneMessage"
            class="message"
            :class="{ error: !isPhoneValid }"
            >{{ phoneMessage }}</span
          >
        </div>

        <!-- 등록 버튼 -->
        <button type="submit" class="button submit-button">Register</button>
        <div class="registration-prompt">
          Already have an account?
          <router-link to="/login" class="register-link">Login</router-link>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  name: "RegisterView",

  data() {
    return {
      userId: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone1: "",
      phone2: "",
      phone3: "",
      isUserIdValid: true,
      userIdMessage: "",
      isEmailValid: true,
      emailMessage: "",
      isPasswordValid: true,
      passwordMessage: "",
      isConfirmPasswordValid: true,
      confirmPasswordMessage: "",
      isPhoneValid: true,
      phoneMessage: "",
    };
  },

  mounted() {
    if (this.$store.getters.isLoggedIn) {
      alert("이미 로그인되어 있습니다.");
      this.$router.push("/");
    }
  },

  methods: {
    async handleRegistration() {
      if (!this.validateForm()) return;

      try {
        const registrationData = {
          userId: this.userId,
          email: this.email,
          password: this.password,
          phone: `${this.phone1}-${this.phone2}-${this.phone3}`,
        };

        // 여기에 서버로 데이터를 전송하는 코드를 작성하십시오.
        const isRegistrationSuccessful = await this.$store.dispatch(
          "register",
          registrationData
        );

        if (isRegistrationSuccessful) {
          this.$router.push("/login");
        } else {
          alert("등록에 실패했습니다.");
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },

    validateForm() {
      this.validateUserId();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validatePhone();

      return (
        this.isUserIdValid &&
        this.isEmailValid &&
        this.isPasswordValid &&
        this.isConfirmPasswordValid &&
        this.isPhoneValid
      );
    },

    async validateUserId() {
      this.isUserIdValid = true;
      this.userIdMessage = "";

      if (!this.userId) {
        this.isUserIdValid = false;
        this.userIdMessage = "아이디를 입력해주세요.";
        return;
      }

      // 아이디 길이 및 문자 유효성 검사
      if (this.userId.length < 4 || this.userId.length > 20) {
        this.isUserIdValid = false;
        this.userIdMessage = "아이디는 4자 이상 20자 이하로 입력해주세요.";
        return;
      }

      if (!/^[a-zA-Z0-9-_]+$/.test(this.userId)) {
        this.isUserIdValid = false;
        this.userIdMessage =
          "아이디는 영문자, 숫자, 밑줄(_), 대시(-)만 사용할 수 있습니다.";
      }

      const isUserIdAvailable = await this.$store.dispatch(
        "checkUserIdAvailability",
        this.userId
      );
      if (!isUserIdAvailable) {
        this.isUserIdValid = false;
        this.userIdMessage = "이미 사용 중인 아이디입니다.";
      }
    },

    validateEmail() {
      this.isEmailValid = true;
      this.emailMessage = "";

      if (!this.email) {
        this.isEmailValid = false;
        this.emailMessage = "이메일을 입력해주세요.";
        return;
      }

      // 이메일 형식 검사
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)
      ) {
        this.isEmailValid = false;
        this.emailMessage = "유효한 이메일 주소를 입력해주세요.";
      }
    },

    validatePassword() {
      this.isPasswordValid = true;
      this.passwordMessage = "";

      if (!this.password) {
        this.isPasswordValid = false;
        this.passwordMessage = "비밀번호를 입력해주세요.";
        return;
      }

      // 비밀번호 길이 및 복잡성 검사
      if (this.password.length < 8 || this.password.length > 20) {
        this.isPasswordValid = false;
        this.passwordMessage = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
        return;
      }

      if (
        !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/.test(
          this.password
        )
      ) {
        this.isPasswordValid = false;
        this.passwordMessage =
          "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.";
      }
    },

    validateConfirmPassword() {
      this.isConfirmPasswordValid = true;
      this.confirmPasswordMessage = "";

      if (this.password !== this.confirmPassword) {
        this.isConfirmPasswordValid = false;
        this.confirmPasswordMessage = "비밀번호가 일치하지 않습니다.";
      }
    },

    validatePhone() {
      this.isPhoneValid = true;
      this.phoneMessage = "";

      if (!this.phone1 || !this.phone2 || !this.phone3) {
        this.isPhoneValid = false;
        this.phoneMessage = "전화번호를 입력해주세요.";
        return;
      }

      // 전화번호 형식 검사
      if (
        !/^[0-9]{3,4}$/.test(this.phone1) ||
        !/^[0-9]{4}$/.test(this.phone2) ||
        !/^[0-9]{4}$/.test(this.phone3)
      ) {
        this.isPhoneValid = false;
        this.phoneMessage = "유효한 전화번호를 입력해주세요.";
      }
    },
  },
};
</script>

<style scoped>
.registration-section {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  overflow-y: hidden;
  align-content: center;
}

.image-container {
  flex: 1 1 50%;
  max-width: 50%;
  height: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.registration-article {
  flex: 1 1 50%;
  display: flex;
  max-width: 50%;
  align-items: center;
  justify-content: center;
}

.registration-form {
  width: 100%;
  padding: 20px;
  max-width: 450px;
  box-sizing: border-box;
  border-radius: 5px;
  flex-direction: column;
}

.form-title,
.form-description {
  text-align: center;
}

.form-title {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  font-weight: bold;
}

.form-description {
  margin: 0 0 2rem;
  font-size: 1rem;
  font-weight: 400;
}

.input-wrapper {
  margin-bottom: 1rem;
}

.input-wrapper label {
  display: block;
  margin-bottom: 0.5rem;
}

.phone-input {
  gap: 0.5rem;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #363636;
  border-radius: 5px;
  box-sizing: border-box;
  color: white;
  background-color: #161616;
}

.submit-button {
  width: 100%;
  padding: 14px 20px;
  margin-top: 8px;
}

.registration-prompt {
  margin-top: 2rem;
  text-align: center;
}

.register-link {
  color: #ffc025;
  margin-left: 0.5rem;
}

.register-link:hover {
  color: #ff9f00;
  text-decoration: underline;
}

.register-link:active {
  color: #cb7e02;
}

.message {
  /* 초록 */
  color: #00ff00;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.error {
  color: red;
}

@media (max-width: 768px) {
  .image-container {
    display: none;
  }

  .registration-article {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
