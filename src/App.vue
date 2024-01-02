<template>
  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Login from './components/Login.vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
export default {
  name: 'App',
  // components: {
  //   HelloWorld,
  //   Login
  // }
  // 与 beforeRouteUpdate 相同，无法访问 `this`
    // onBeforeRouteUpdate((to, from) => {
    //   //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改

    //   const token = sessionStorage.getItem("token")
    //   to()
    // })
}
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
</style>
