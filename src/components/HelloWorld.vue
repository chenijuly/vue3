<template>
  <div class="hello">
    <h1>你好呀，{{user.userInfo.username}}。</h1>
    <h2>但是现在什么都还没有呢</h2>
  </div>
</template>

<script setup>
import {useInfoStore} from '@/stores/user.js'
const user = useInfoStore()
console.log(user.userInfo);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
