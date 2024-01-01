<template>
  <div class="header-background">
    <header class="header">
      <router-link to="/" class="header-logo">
        <i class="fa-brands fa-bitcoin header-icon"></i>
        <span class="header-title">코모</span>
      </router-link>

      <nav class="nav">
        <router-link
          v-for="link in visibleLinks"
          :key="link.name"
          :to="link.path"
          class="nav-item"
          :class="{ active: isActiveLink(link.path) }"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <div class="user-button-box">
        <router-link
          v-for="button in visibleButtons"
          :key="button.name"
          :to="button.path"
          @click="button.action"
          class="button"
          :class="buttonClass(button.name)"
        >
          {{ button.name }}
        </router-link>
      </div>

      <i class="fa-solid fa-bars burger-button" @click="toggleBurgerMenu"></i>

      <div class="burger-menu" v-if="burgerMenu">
        <router-link
          v-for="link in visibleLinksAndButtons"
          :key="link.name"
          :to="link.path"
          class="burger-menu-link"
          :class="{ active: isActiveLink(link.path) }"
        >
          {{ link.name }}
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",

  data() {
    return {
      burgerMenu: false,
      linkList: [
        { name: "홈", path: "/", requiresAuth: false },
        { name: "회사소개", path: "/intro", requiresAuth: false },
        { name: "프로그램 소개", path: "/program", requiresAuth: true }, // 로그인 필요
        { name: "상품가격", path: "/pricing", requiresAuth: false },
        { name: "프로그램 다운로드", path: "/download", requiresAuth: true }, // 로그인 필요
        { name: "레퍼럴", path: "/referral", requiresAuth: true }, // 로그인 필요
        { name: "상담신청", path: "/counsel", requiresAuth: false },
      ],
      userButtons: [
        { name: "로그인", path: "/login", requiresAuth: false },
        { name: "회원가입", path: "/register", requiresAuth: false },
        {
          name: "로그아웃",
          path: "/",
          action: this.$store.dispatch("logout"),
        },
        { name: "마이페이지", path: "/mypage", requiresAuth: true },
      ],
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    visibleLinks() {
      return this.filterLinks(this.linkList);
    },

    visibleButtons() {
      return this.filterLinks(this.userButtons, true);
    },

    visibleLinksAndButtons() {
      return this.filterLinks([...this.linkList, ...this.userButtons]);
    },
  },

  methods: {
    toggleBurgerMenu() {
      this.burgerMenu = !this.burgerMenu;
    },

    isActiveLink(path) {
      return this.$route.path === path;
    },

    buttonClass(name) {
      return {
        "como-button1": name === "마이페이지" || name === "회원가입",
        "como-button2": name === "로그인" || name === "로그아웃",
      };
    },

    filterLinks(links, isButton = false) {
      return links.filter((link) => {
        console.log("isLoggedIn:", this.isLoggedIn); // 로그인 상태 확인

        if (isButton) {
          return (
            this.isLoggedIn === link.requiresAuth &&
            this.$route.path !== link.path
          );
        } else {
          return (
            this.isLoggedIn === link.requiresAuth ||
            this.$route.path === link.path
          );
        }
      });
    },
  },
};
</script>

<style scoped>
.header-background {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #161616c0;
  backdrop-filter: blur(20px);
}

.header {
  margin: auto;
  padding: 20px;
  display: flex;
  max-width: 1440px;
  align-items: center;
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
  gap: 20px;
  display: flex;
  margin-left: 50px;
}

.nav-item:hover {
  color: #ff9f00;
}
.nav-item:active {
  color: #cb7e02;
}

.user-button-box {
  gap: 20px;
  display: flex;
  margin-left: auto;
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

  .burger-menu-link {
    padding: 10px;
    color: white;
    text-decoration: none;
  }

  .burger-menu-link:hover {
    color: #ff9f00;
  }

  .burger-menu-link:active {
    color: #cb7e02;
  }

  .burger-menu-link:last-child {
    margin-bottom: 10px;
  }

  .user-button-box {
    display: none;
  }
}

.active {
  color: #ffc025;
}
</style>
