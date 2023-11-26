<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
a {
  color: inherit;
  text-decoration: none;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  outline: 0;
  color: white;
  background-color: #161616;
}

/* 공통 버튼 스타일 */
.button {
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  padding: 10px 20px;
  transition: 0.3s;
  font-weight: bold;
  border-radius: 10px;
}

.como-button1 {
  color: #161616;
  border: 1px solid #ffc025;
  background: #ffc025;
}
.como-button1:hover {
  background: #ff9f00;
  border-color: #ff9f00;
}
.como-button1:active {
  background: #cb7e02;
  border-color: #cb7e02;
}

.como-button2 {
  border: 1px solid white;
  background: transparent;
}
.como-button2:hover {
  color: #161616;
  background: #eeeeee;
  border-color: #eeeeee;
}
.como-button2:active {
  background: #cccccc;
  border-color: #cccccc;
}
</style>
