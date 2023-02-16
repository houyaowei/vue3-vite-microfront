<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// import { setGlobalState }  from "./core/app-store"
import actions from "./core/shareActions"

function goToPage(app) {
  history.pushState(null, app, app);
}
function sendMessage() {
  actions.setGlobalState({
    from: 'app.vue',
    user: {
        name: 'app vue admin',
    }
  })
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Portal" />
      <nav >
        <!-- <RouterLink to="/app1">App1</RouterLink>
        <RouterLink to="/app2">App2</RouterLink> -->
        <div style="color: hsla(160, 100%, 37%, 1); cursor: pointer;" @click="goToPage('/app1')">切换到App1</div>
        <div style="color: hsla(160, 100%, 37%, 1);cursor: pointer;" @click="goToPage('/dm-web-tags')">切换到App2</div>
        <div style="color: hsla(160, 100%, 37%, 1);cursor: pointer;" @click="sendMessage">消息通知</div>
      </nav>
    </div>
  </header>
  <!-- <RouterView /> -->
  <div>
    <div id="app"></div>
    <div id="sub-app-viewport"></div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
