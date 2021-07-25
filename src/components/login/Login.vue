<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- 用户名密码 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <!-- 按钮  -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" @keyup.enter.native="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5-10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.status !== 200) {
          return this.$message.error('登陆失败')
        }
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: url("../../assets/background.jpg") no-repeat;
  background-size: cover;
  height: 100%;
}

.login_box {
  min-width: 300px;
  min-height: 220px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
}

.btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 0;
  box-sizing: border-box;
}
</style>
