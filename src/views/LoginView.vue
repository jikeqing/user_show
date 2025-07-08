<!-- 确保有模板内容 -->
<template>
  <a-card title="登录" style="width: 400px; "  class="login-card">
    <a-form :model="formState" @finish="onFinish">
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="密&nbsp&nbsp&nbsp&nbsp码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item style="text-align: center">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
// 确保有脚本内容
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formState = ref({
  username: '',
  password: ''
})

const onFinish = (values) => {
  localStorage.setItem('userRole', values.username === 'admin' ? 'admin' : 'user')
  router.push('/main?username=' + values.username)
}
</script>

<!-- 如果有样式，也可以添加<style>部分 -->
<style>
/* 样式内容 */
.login-card {
  margin:auto;
  margin-top: 15%;
}
</style>