<template>
  <section class="registration-section">
    <div class="image-container">
      <img src="@/assets/img/login_input.png" alt="Registration Image" />
    </div>

    <article class="registration-article">
      <form @submit.prevent="handleRegistration" class="registration-form">
        <h1 class="form-title">Register</h1>
        <p class="form-description">Create your new account</p>

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
          <label for="new-password">Choose a password</label>
          <input
            id="new-password"
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

        <button type="submit" class="button como-button1 submit-button">
          Register
        </button>
        <div class="registration-prompt">
          이미 회원이신가요?
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
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleRegistration() {
      console.log(
        "Registration attempted with:",
        this.email,
        this.password,
        this.confirmPassword
      );
      // Implement registration logic here
    },
  },
};
</script>

<style scoped>
.registration-section {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.image-container {
  flex: 1 1 50%;
  max-width: 50%;
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
