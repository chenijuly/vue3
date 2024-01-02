<!--
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-28 09:32:45
 * @LastEditors: jdchen
 * @LastEditTime: 2023-12-28 10:46:57
-->
<template>
  <div class="page-content">
    <div class="page-form">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style>
.page-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: url('https://cn.bing.com/th?id=OHR.KirkjufellAurora_ZH-CN7878752057_1920x1080.webp&qlt=50');
}
.page-form {
  float: right;
  margin-top: 100px;
  margin-right: 100px;
  background: rgba(255, 255, 255, 0.5);
  padding: 24px;
  border-radius: 4px;
  width: 360px;
}
</style>
