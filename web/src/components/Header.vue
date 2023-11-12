<template>
  <div class="header">
    <div class="title">COMO</div>

    <div class="navgation">
      <router-link
        class="nav-item"
        v-for="link in links"
        :key="link.name"
        :to="link.path"
      >
        {{ link.name }}
      </router-link>
    </div>

    <div class="user">
      <router-link class="login" to="/login">로그인</router-link>
      <router-link class="register" to="/register">가입하기</router-link>
    </div>

    <span class="hambuger" @click="isShow = !isShow"> &equiv; </span>
    <div class="dropdown" v-if="isShow">
      <!-- <div class="dropdown"> -->
      <!-- hambuger -->
      <router-link
        class="dropdown-item"
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        >{{ link.name }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",

  data() {
    return {
      isShow: false,

      links: [
        { name: "회사소개", path: "/" },
        { name: "프로그램 소개", path: "/" },
        { name: "상품가격", path: "/" },
        { name: "프로그램 다운로드", path: "/" },
        { name: "고객센터", path: "/" },
        { name: "레퍼럴", path: "/" },
        { name: "상담신청", path: "/" },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  /* background-color: #fff; */
  background: linear-gradient(
    90deg,
    rgba(13, 12, 67, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  padding: 0 100px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}

.navgation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 100%;
}

.nav-item {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
}
.nav-item:hover {
  text-decoration: underline;
}
.nav-item:active {
  color: #0d0c43;
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #fff;
}
.login:hover {
  background: #0d0c43;
  color: #fff;
  border-color: #0d0c43;
}

.register {
  margin-left: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  background: white;
  color: #0d0c43;
  padding: 10px 20px;
  border-radius: 10px;
}
.register:hover {
  background: #0d0c43;
  color: #fff;
}
.register:active {
  background: #0d0c43;
  color: #fff;
}

.hambuger {
  display: none;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

.dropdown {
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 1;
}

.dropdown-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  color: #0d0c43;
  text-decoration: none;
}

@media screen and (max-width: 1024px) {
  .header {
    padding: 0 50px;
  }
}

@media screen and (max-width: 768px) {
  .header {
    padding: 0 20px;
  }

  .navgation {
    display: none;
  }

  .user {
    display: none;
  }

  .hambuger {
    display: block;
  }

  .dropdown {
    display: block;
  }
}

@media screen and (max-width: 480px) {
  .header {
    padding: 0 20px;
  }

  .navgation {
    display: none;
  }

  .user {
    display: none;
  }

  .hambuger {
    display: block;
  }

  .dropdown {
    display: block;
  }
}

@media screen and (max-width: 320px) {
  .header {
    padding: 0 20px;
  }

  .navgation {
    display: none;
  }

  .user {
    display: none;
  }

  .hambuger {
    display: block;
  }

  .dropdown {
    display: block;
  }
}
</style>
