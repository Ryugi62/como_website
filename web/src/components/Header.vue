<template>
  <div class="header">
    <RouterLink to="/" class="header-logo">
      <i class="fa-brands fa-bitcoin header-icon"></i>
      <div class="header-title">코모</div>
    </RouterLink>

    <div class="nav">
      <RouterLink
        v-for="link in linkList"
        :key="link.name"
        :to="link.path"
        class="nav-item"
        :class="{ active: $route.path === link.path }"
      >
        {{ link.name }}
      </RouterLink>
    </div>

    <RouterLink class="login-button" to="/login"> 로그인 </RouterLink>
    <RouterLink class="register-button" to="/register"> 회원가입 </RouterLink>

    <i
      class="fa-solid fa-bars buger-button"
      @click="bugerMenu = !bugerMenu"
    ></i>
    <div class="buger-menu" v-if="bugerMenu">
      <div class="buger-menu-item" v-for="link in linkList" :key="link.name">
        <RouterLink :to="link.path" class="buger-menu-link">
          {{ link.name }}
        </RouterLink>
      </div>

      <div class="buger-menu-item">
        <RouterLink to="/login" class="buger-menu-link"> 로그인 </RouterLink>
      </div>

      <div class="buger-menu-item">
        <RouterLink to="/register" class="buger-menu-link">
          회원가입
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",

  data() {
    return {
      bugerMenu: false,

      linkList: [
        { name: "회사소개", path: "/intro" },
        { name: "프로그램 소개", path: "/program" },
        { name: "상품가격", path: "/price" },
        { name: "프로그램 다운로드", path: "/download" },
        { name: "고객센터", path: "/customer" },
        { name: "레퍼럴", path: "/" },
        { name: "상담신청", path: "/" },
      ],
    };
  },
};
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}

.header {
  top: 0;
  margin: auto;
  display: flex;
  padding: 20px;
  position: sticky;
  max-width: 1200px;
  align-items: center;
}

.header-logo {
  display: flex;
  font-weight: bold;
  align-items: center;
  color: #ffc025;
}

.header-icon {
  width: fit-content;
  height: fit-content;
  font-size: 30px;
}

.header-title {
  margin: 0;
  font-size: 30px;
  margin-left: 10px;
}

.nav {
  display: flex;
  margin-left: 50px;
}

.nav-item:not(:first-child) {
  margin-left: 20px;
}
.nav-item:hover {
  text-decoration: underline;
}
.nav-item:active {
  color: #997416;
}

.active {
  color: #ffc025;
}

.login-button,
.register-button {
  border: 1px solid;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s;
}

.login-button {
  margin-left: auto;
}
.login-button:hover {
  color: white;
  border-color: #ffc025;
  background-color: #ffc025;
}
.login-button:active {
  color: #161616;
  transition: 0.1s;
}

.register-button {
  background: #ffc025;
  margin-left: 20px;
  border-color: #ffc025;
}
.register-button:hover {
  color: #161616;
  border-color: white;
  background-color: white;
}
.register-button:active {
  color: #ffc025;
  transition: 0.1s;
}

.buger-button {
  cursor: pointer;
  display: none;
  font-size: 30px;
  margin-left: auto;
}

.buger-menu {
  top: 100%;
  right: 0;
  width: 100%;
  color: white;
  padding: 10px;
  display: none;
  position: absolute;
  align-items: center;
  flex-direction: column;
  background-color: #161616;
}

.buger-menu-item {
  margin: 10px 0;
  padding: 10px;
}

.buger-menu-link {
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .header {
    padding: 10px;
  }

  .header-logo {
    font-size: 20px;
  }

  .header-title {
    font-size: 20px;
  }

  .nav {
    display: none;
  }

  .login-button {
    display: none;
  }

  .register-button {
    display: none;
  }

  .buger-button {
    display: block;
  }

  .buger-menu {
    display: flex;
  }
}
</style>
