<template>
  <section class="registration-section">
    <div class="image-container">
      <img src="@/assets/img/register-bitcoin.png" alt="Registration Image" />
    </div>

    <article class="registration-article">
      <form @submit.prevent="handleRegistration" class="registration-form">
        <h1 class="form-title">Register</h1>
        <p class="form-description">Create your new account</p>

        <div class="input-wrapper">
          <label for="userId">Choose a userId</label>
          <div class="userid-input">
            <input
              id="userId"
              v-model="userId"
              type="text"
              class="input-field"
              placeholder="User ID"
              @blur="checkUserIdAvailability"
            />
          </div>
          <span
            v-if="userIdMessage"
            class="message"
            :class="{ error: !isUserIdAvailable }"
            >{{ userIdMessage }}</span
          >
        </div>

        <div class="input-wrapper">
          <label for="email">Enter your email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input-field"
            placeholder="Email"
          />
        </div>

        <div class="input-wrapper">
          <label for="password">Choose a password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input-field"
            placeholder="Password"
          />
        </div>

        <div class="input-wrapper">
          <label for="confirm-password">Confirm your password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            class="input-field"
            placeholder="Confirm Password"
          />
        </div>

        <div class="input-wrapper">
          <label for="phone">Enter your phone number</label>
          <div class="phone-input">
            <input
              id="phone1"
              v-model="phone1"
              type="tel"
              class="input-field"
              placeholder="XXX"
            />
            <span>-</span>
            <input
              id="phone2"
              v-model="phone2"
              type="tel"
              class="input-field"
              placeholder="XXXX"
            />
            <span>-</span>
            <input
              id="phone3"
              v-model="phone3"
              type="tel"
              class="input-field"
              placeholder="XXXX"
            />
          </div>
        </div>

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
      isUserIdAvailable: null,
      userIdMessage: "",
    };
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

        const isRegistered = await this.$store.dispatch(
          "register",
          registrationData
        );

        if (isRegistered) {
          alert("회원가입에 성공했습니다.");
          this.$router.push("/login");
        } else {
          alert("회원가입에 실패했습니다.");
        }
      } catch (error) {
        alert("회원가입에 실패했습니다.");
      }
    },

    validateForm() {
      if (!this.userId) {
        alert("아이디를 입력해주세요.");
        return false;
      } else if (this.isUserIdAvailable !== true) {
        alert("아이디 중복확인을 해주세요.");
        return false;
      } else if (this.userId.length < 4 || this.userId.length > 20) {
        alert("아이디는 4자 이상 20자 이하로 입력해주세요.");
        return false;
      } else if (!/^[a-z0-9-_]{4,20}$/.test(this.userId)) {
        alert("아이디는 영문 소문자, 숫자, 특수기호(_)(-)만 사용 가능합니다.");
        return false;
      }

      if (!this.email) {
        alert("이메일을 입력해주세요.");
        return false;
      } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.email)) {
        alert("이메일 형식이 올바르지 않습니다.");
        return false;
      }

      if (!this.password) {
        alert("비밀번호를 입력해주세요.");
        return false;
      } else if (this.password.length < 8 || this.password.length > 20) {
        alert("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
        return false;
      } else if (
        !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(
          this.password
        )
      ) {
        alert(
          "비밀번호는 영문자, 숫자, 특수문자를 모두 포함해야 합니다. (공백은 사용할 수 없습니다.)"
        );
        return false;
      } else if (this.password !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      }

      if (!this.phone1 || !this.phone2 || !this.phone3) {
        alert("전화번호를 입력해주세요.");
        return false;
      } else if (
        !/^[0-9]{3}$/.test(this.phone1) ||
        !/^[0-9]{4}$/.test(this.phone2) ||
        !/^[0-9]{4}$/.test(this.phone3)
      ) {
        alert("전화번호 형식이 올바르지 않습니다.");
        return false;
      }

      return true;
    },

    async checkUserIdAvailability() {
      if (!this.userId) {
        this.isUserIdAvailable = null;
        this.userIdMessage = "";
        return;
      }
      try {
        const isAvailable = await this.$store.dispatch(
          "checkUserIdAvailability",
          this.userId
        );

        this.isUserIdAvailable = isAvailable;
        this.userIdMessage = isAvailable
          ? "사용 가능한 아이디입니다."
          : "이미 존재하는 아이디입니다.";
      } catch (error) {
        this.isUserIdAvailable = false;
        this.userIdMessage = "아이디 확인 중 오류가 발생했습니다.";
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
