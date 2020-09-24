<template>
  <div id="app">
    <p class="title">Spanish to English flashcards</p>
    <img alt="Vue logo" src="./assets/logo.png" />
    <FlashCards />
  </div>
</template>

<script>
import FlashCards from "./components/FlashCards.vue";
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

export default {
  name: "App",
  components: {
    FlashCards,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  font-size: large;
  font-weight: bold;
}
</style>
