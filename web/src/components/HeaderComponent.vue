<template>
  <header class="header">
    <RouterLink to="/" class="header-logo">
      <i class="fa-brands fa-bitcoin header-icon"></i>
      <span class="header-title">코모</span>
    </RouterLink>

    <nav class="nav">
      <RouterLink
        v-for="link in linkList"
        :key="link.name"
        :to="link.path"
        class="nav-item"
        :class="{ active: $route.path === link.path }"
      >
        {{ link.name }}
      </RouterLink>
    </nav>

    <RouterLink class="button como-button2 login-button" to="/login"
      >로그인</RouterLink
    >
    <RouterLink class="button como-button1 register-button" to="/register"
      >회원가입</RouterLink
    >

    <i
      class="fa-solid fa-bars burger-button"
      @click="burgerMenu = !burgerMenu"
    ></i>
    <div class="burger-menu" v-if="burgerMenu">
      <RouterLink
        v-for="link in linkList"
        :key="link.name"
        :to="link.path"
        class="burger-menu-link"
      >
        {{ link.name }}
      </RouterLink>
      <RouterLink to="/login" class="burger-menu-link">로그인</RouterLink>
      <RouterLink to="/register" class="burger-menu-link">회원가입</RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      burgerMenu: false,
      linkList: [
        { name: "홈", path: "/" },
        { name: "회사소개", path: "/intro" },
        { name: "프로그램 소개", path: "/program" },
        { name: "상품가격", path: "/pricing" },
        { name: "프로그램 다운로드", path: "/download" },
        { name: "레퍼럴", path: "/referral" },
        { name: "상담신청", path: "/counsel" },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  top: 0;
  width: calc(100% - 40px);
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #161616;
  position: sticky;
  max-width: 1440px;
  margin: auto;
  z-index: 100;
}

.header-logo {
  color: #ffc025;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.header-icon {
  font-size: 30px;
}

.header-title {
  margin-left: 10px;
  font-size: 30px;
}

.nav {
  margin-left: 50px;
  display: flex;
}

.nav-item {
  margin-left: 20px;
}
.nav-item:not(:first-child) {
  margin-left: 20px;
}
.nav-item:hover {
  color: #ff9f00;
}
.nav-item:active {
  color: #cb7e02;
}

.login-button {
  margin-left: auto;
}

.register-button {
  margin-left: 20px;
}

.burger-button {
  display: none;
  cursor: pointer;
  font-size: 30px;
  margin-left: auto;
}

.burger-menu {
  display: none;
  top: 100%;
  right: 0;
  width: 100%;
  padding: 10px;
  position: absolute;
  flex-direction: column;
  align-items: center;
  background-color: #161616;
}

.burger-menu-link {
  margin: 10px 0;
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .header {
    padding: 10px;
  }

  .header-logo,
  .header-title {
    font-size: 20px;
  }

  .nav,
  .login-button,
  .register-button {
    display: none;
  }

  .burger-button {
    display: block;
  }

  .burger-menu {
    display: flex;
  }
}

.active {
  color: #ffc025;
}
</style>
