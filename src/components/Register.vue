<!--
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-28 07:57:19
 * @LastEditors: jdchen
 * @LastEditTime: 2024-01-02 15:31:35
-->
<template>
  <Background>
    <div @click="changeRegType" style="text-align: left">
      {{ regTypeVal }}>>
    </div>
    <div class="reg-title">注 册</div>
    <a-form ref="formRef" :model="formState" name="dynamic_rule">
      <a-form-item
        name="organizationName"
        :rules="[
          { required: true, message: '请输入公司!' },
          {
            trigger: 'change',
            validator(rule, value, cb) {
              if (!/^[a-zA-Z0-9]{2,100}$/.test(value))
                return cb('2-100位字符，只允许英⽂、数字');
              cb();
            },
          },
        ]"
      >
        <a-input
          v-model:value="formState.organizationName"
          placeholder="请输入或选择公司"
        />
      </a-form-item>
      <a-form-item
        name="userAcct"
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
        <a-input v-model:value="formState.userAcct" placeholder="用户名" />
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[
          { required: true, message: '请输入密码' },
          {
            trigger: 'change',
            validator(rule, value, cb) {
              reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
              if (reg.test(value)) {
                return cb('不能有中文！！');
              }
              if (/\s/g.test(value)) {
                return cb('不能有空格！！');
              }
              if (
                /^[a-zA-Z]+$/.test(value) ||
                /^\d+$/.test(value) ||
                punctuationReg.test(value)
              ) {
                return cb('至少中英文、数字、标点两个种类的字符');
              }
              cb();
            },
          },
        ]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="密码"
          maxLength="14"
        />
      </a-form-item>
      <a-form-item
        name="surePassword"
        :rules="[
          {
            trigger: 'change',
            validator(rule, value, cb) {
              if (value !== formState.password) return cb('确认密码不一致');
              cb();
            },
          },
        ]"
      >
        <a-input-password
          v-model:value="formState.surePassword"
          placeholder="再次输入密码"
        />
      </a-form-item>
      <a-form-item
        name="tel"
        v-if="regType === 1"
        :rules="[
          { required: true, message: '手机号格式错误' },
          {
            trigger: 'change',
            validator(rule, value, cb) {
              console.log(value);
              if (!/^1\d{10}$/.test(value)) return cb('手机号格式错误');
              cb();
            },
          },
        ]"
      >
        <a-input-group compact>
          <a-input value="+86" style="width: 20%" />
          <a-input
            v-model:value="formState.tel"
            style="width: 80%"
            placeholder="手机号"
          />
        </a-input-group>
      </a-form-item>

      <a-form-item
        v-else
        name="email"
        :rules="[
          { required: true, message: '请输入邮箱!' },
          {
            trigger: 'change',
            validator(rule, value, cb) {
              reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
              if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,50}$/.test(value)) {
                return cb('邮箱格式不正确');
              }
              cb();
            },
          },
        ]"
      >
        <a-input v-model:value="formState.email" placeholder="邮箱" />
      </a-form-item>

      <a-form-item v-if="regType === 1" name="telCode">
        <a-input-group compact>
          <a-input
            v-model:value="formState.telCode"
            style="width: calc(100% - 96px)"
            placeholder="请输入验证码"
          />
          <a-button type="primary" @click="getTelCode" style="width: 96px"
            >获取验证码</a-button
          >
        </a-input-group>
      </a-form-item>
      <a-form-item v-else name="emailCode">
        <a-input-group compact>
          <a-input
            v-model:value="formState.emailCode"
            style="width: calc(100% - 96px)"
            placeholder="请输入验证码"
          />
          <a-button type="primary" @click="getEmailCode" style="width: 96px"
            >获取验证码</a-button
          >
        </a-input-group>
      </a-form-item>
      <a-form-item v-bind="formTailLayout">
        <a-button
          type="primary"
          @click="onCheck"
          style="width: 100%; margin-bottom: 12px"
          >注册</a-button
        >
        <a-button type="default" @click="onLogin" style="width: 100%"
          >返回登录</a-button
        >
      </a-form-item>
    </a-form>
  </Background>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref, watch } from "vue";
import {
  Input as AInput,
  Form as AForm,
  FormItem as AFormItem,
  InputPassword as AInputPassword,
  Button as AButton,
  message,
} from "ant-design-vue";
import { getEmailcode, saveEmailReg } from "@/services/reg";
import Background from "./Background.vue";

const formRef = ref();
const formState = reactive({
  organizationId: "7a0455ab-8949-448e-824a-9945c8022d3b",
  organizationName: "",
  userAcct: "",
  password: "",
  email: "",
  emailCode: "",
  timeZone: "",
  // telZone: '86',
  tel: "",
});
const regType = ref(1);
const regTypeVal = ref("邮箱注册");
const punctuationReg = ref(/^[!@#$%^&*()_+-=<>?:"'{}|,.\/\\]+$/);
watch(regType, (newVal, oldVal) => {
  regTypeVal.value = newVal === 1 ? "邮箱注册" : "手机号注册";
});
const router = useRouter();
const changeRegType = () => {
  regType.value = regType.value * -1;
};
const onCheck = async () => {
  try {
    const values = await formRef.value.validateFields();
    const res = await saveEmailReg(values);
    console.log("Success:", res);
    if (res.code !== 0) {
      message.error(res.message);
    } else {
      router.push("/company-login");
    }
  } catch (errorInfo) {
    console.log("Failed:", errorInfo);
  }
};
const onLogin = () => {
  router.push("/company-login");
};

const getTelCode = async () => {
  console.log(formState);
  if (!formState.tel) {
    return message.error("请输入手机号");
  }
};
const getEmailCode = async () => {
  console.log(formState);
  if (!formState.email) {
    return message.error("请输入邮箱");
  }
  const res = await getEmailcode();

  if (res.code === 0) {
    formState.emailCode = res.data.emailCode;
  }
  console.log(res);
};
</script>

<style>
.reg-title {
  height: 36px;
  line-height: 36px;
  margin-bottom: 12px;
}
</style>
