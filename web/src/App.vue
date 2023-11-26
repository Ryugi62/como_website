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
  height: 100%;
  width: 100%;
}

#app {
  color: white;
  background-color: #161616;
}

.como-button {
  width: fit-content;
  cursor: pointer;
  height: fit-content;
  border: 1px solid #ffc025;
  padding: 10px 20px;
  background: #ffc025;
  transition: 0.3s;
  font-weight: bold;
  border-radius: 10px;
}
.como-button:hover {
  background: #ff9f00;
  border-color: #ff9f00;
}
.como-button:active {
  transition: 0.1s;
  background: #cb7e02;
  border-color: #cb7e02;
}
</style>
