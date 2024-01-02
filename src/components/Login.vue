<!--
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-27 15:31:15
 * @LastEditors: jdchen
 * @LastEditTime: 2024-01-02 15:08:43
-->
<template>
  <Background>
    <div class="login-title">登 录</div>
    <a-form
      ref="formRef"
      :model="formState"
      name="dynamic_rule"
      v-bind="formItemLayout"
    >
      <a-form-item
        name="username"
        :rules="[
          { required: true, message: '请输入用户名!' },
          {
            trigger: 'change',
            validator(rule, value, cb) {
              if (!/^[a-zA-Z0-9]{2,10}$/.test(value))
                return cb('2-20位字符，只允许英⽂、数字');
              cb();
            },
          },
        ]"
      >
        <a-input v-model:value="formState.username" placeholder="请输入用户名"/>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[
          { required: true, message: '请输入密码!' },
          {
            trigger: 'change',
            validator(rule, value, cb) {
              if (!/^[a-zA-Z0-9]{8,16}$/.test(value))
                return cb('8-16位字符，只允许数字、英⽂');
              cb();
            },
          },
        ]"
      >
        <a-input-password v-model:value="formState.password" placeholder="请输入密码"/>
      </a-form-item>
    <div style="text-align: right">忘记密码</div>
      <a-form-item v-bind="formTailLayout">
        <a-button
          type="primary"
          @click="onCheck"
          style="width: 100%; margin-bottom: 12px"
          >登 录</a-button
        >
        <a-button type="default" @click="onReg" style="width: 100%"
          >注 册</a-button
        >
      </a-form-item>
    </a-form>
  </Background>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "vue";
import Background from "./Background.vue";
import {
  Input as AInput,
  Form as AForm,
  FormItem as AFormItem,
  InputPassword as AInputPassword,
  Button as AButton,
  message,
} from "ant-design-vue";
import { toLogin } from '@/services/login'
import { useInfoStore } from "@/stores/user"
const formRef = ref();
const formState = reactive({
  username: "",
  nickname: "",
});
const submitRes = async (values) => {
  const res = await toLogin()
  
  console.log(res);
  if (res.code === 0) {
    sessionStorage.setItem("token", res.data?.token?.access_token);
    const user = useInfoStore()
    const {username, sex} = res.data
    user.addUserInfo({username, sex})
    router.push("/");
  }
  else{
    message.error(res.message)
  }
};
const onCheck = async () => {
  try {
    const values = await formRef.value.validateFields();
    submitRes(values);
    console.log("Success:", values);
  } catch (errorInfo) {
    console.log("Failed:", errorInfo);
  }
};
const router = useRouter();
const onReg = () => {
  router.push("/company-reg");
};
// const formItemLayout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 8 },
// };
// const formTailLayout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 8, offset: 4 },
// };
</script>

<style>
.login-title{
  height: 36px;
  line-height: 36px;
  margin-bottom: 12px;
}
</style>
