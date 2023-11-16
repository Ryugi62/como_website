<template>
  <div class="overlay">
    <div class="header">
      <RouterLink to="/" class="title">MOCO </RouterLink>
      <div class="nav">
        <RouterLink
          v-for="link in linkList"
          :key="link.name"
          :to="link.path"
          class="nav-item link"
          >{{ link.name }}</RouterLink
        >
      </div>
      <div class="user">
        <RouterLink to="/" class="user-item btn login">로그인</RouterLink>
        <RouterLink to="/" class="user-item btn register">회원가입</RouterLink>
      </div>
      <div class="hambuger" :class="{ active: menu }" @click="menu = !menu">
        &equiv;
      </div>
      <div class="dropdown" v-if="menu">
        <RouterLink
          v-for="link in linkList"
          :key="link.name"
          :to="link.path"
          class="dropdown-item link"
          >{{ link.name }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      menu: false,

      linkList: [
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
* {
  /* border: 1px solid red; */
}

.overlay {
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #eee;
}

.header {
  margin: auto;
  height: 100px;
  display: flex;
  padding: 0 50px;
  font-size: 16px;
  max-width: 1440px;
  align-items: center;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-right: 30px;
}

.nav {
  display: flex;
}

.nav-item {
  padding: 10px 15px;
}
.nav-item:last-child {
  margin-right: 0;
}

.link:hover {
  color: #f8b700;
  text-decoration: underline;
}
.link:active {
  color: black;
}

.user {
  display: flex;
  margin-left: auto;
}

.btn {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #f8b700;
}
.btn:hover {
  text-decoration: underline;
}

.login {
  border: 1px solid black;
}

.register {
  color: #fff;
  margin-left: 10px;
  background-color: #f8b700;
}

.hambuger {
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: none;
  font-size: 30px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
}

.dropdown {
  display: none;
}

.dropdown-item {
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.active {
  color: #f8b700;
}

@media screen and (max-width: 768px) {
  .header {
    padding: 0 20px;
  }

  .title {
    font-size: 20px;
    margin-right: 20px;
  }

  .nav {
    display: none;
  }

  .user {
    display: none;
  }

  .hambuger {
    display: flex;
  }

  .dropdown {
    top: 100px;
    left: 0;
    width: 100%;
    display: flex;
    position: absolute;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #eee;
    flex-direction: column;
    background-color: #fff;
  }
}
</style>
