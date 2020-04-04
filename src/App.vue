<template>
  <div id="app">
    <topBar />
    <router-view />
  </div>
</template>
<script>
import topBar from "@/components/app/TopBar.vue";
export default {
  name: "App",
  components: {
    topBar
  }
};
</script>
<style lang="scss">
html {
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
}
body {
  height: 100vh;
  width: 100vw;
  color: #ffffff;
  background-color: $theme-primary;
  overflow: hidden;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: #fff;
}

#app {
  overflow: auto;
  height: 100%;
}
</style>
