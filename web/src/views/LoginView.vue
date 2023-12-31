<template>
  <section class="login-section">
    <div class="image-container">
      <img src="@/assets/img/login_input.png" alt="Login Image" />
    </div>

    <article class="login-article">
      <form @submit.prevent="handleLogin" class="login-form">
        <h1 class="form-title">Login</h1>
        <p class="form-description">Securely access your account</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-wrapper">
            <label for="userId">Enter your email address</label>
            <input
              id="userId"
              v-model="userId"
              type="text"
              class="input-field"
              placeholder="userId"
            />
          </div>

          <div class="input-wrapper">
            <label for="password">Enter your password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="input-field"
              placeholder="Password"
            />
          </div>

          <button type="submit" class="button como-button1 submit-button">
            Login
          </button>
        </form>

        <div class="registration-prompt">
          아직 회원이 아니신가요?
          <router-link to="/register" class="register-link"
            >Register</router-link
          >
        </div>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      userId: "",
      password: "",
    };
  },

  methods: {
    async handleLogin() {
      try {
        const response = await this.$store.dispatch("login", {
          userId: this.userId,
          password: this.password,
        });

        console.log(response);

        if (response) {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.login-section {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  overflow-y: hidden;
  align-content: center;
}

.image-container {
  flex: 1 1 50%;
  height: 100%;
  max-width: 50%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
}

.login-article {
  flex: 1 1 50%;
  display: flex;
  max-width: 50%;
  align-items: center;
  justify-content: center;
}

.login-form {
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

.input-field {
  width: 100%;
  color: white;
  border: 1px solid #363636;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 5px;
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

@media (max-width: 768px) {
  .image-container {
    display: none;
  }

  .login-article {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
