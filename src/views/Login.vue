<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar">
        <img src="~assets/avatar.jpg" />
      </div>
      <!-- 登录表单 -->
      <el-form
        ref="loginRef"
        class="login_form"
        :model="loginInfo"
        :rules="loginRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginInfo.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginInfo.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginRequest } from 'network/login'

export default {
  name: 'Login',
  data() {
    return {
      // 绑定的表单数据对象
      loginInfo: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 12, message: '用户名长度2-12位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$refs.loginRef.resetFields()
    },
    // 登录
    login() {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await loginRequest(this.loginInfo)
        if (res.meta.status !== 200) {
          this.$msg.error(res.meta.msg)
        } else {
          this.$msg.success('登录成功！')
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
        // loginRequest(this.loginInfo).then(res => {
        //   if (res.meta.status !== 200) {
        //     this.$msg.error(res.meta.msg)
        //   } else {
        //     this.$msg.success('登录成功！')
        //     window.sessionStorage.setItem('token', res.data.token)
        //     this.$router.push('/home')
        //   }
        // })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: gray;

  .login_box {
    position: relative;
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;

    .avatar {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 5px;
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 50%;
      box-shadow: 0 0 7px #eee;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .login_form {
      box-sizing: border-box;
      position: absolute;
      bottom: 10px;
      width: 100%;
      padding: 0 20px;
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>