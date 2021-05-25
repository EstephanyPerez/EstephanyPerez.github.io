<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">Bienvenido a Chaska</h3>
      </div>

      <el-button type="primary" style="width:100%;margin-bottom:30px;">Pedir token</el-button>
    </el-form>
  </div>
</template>

<script>

import { sendToken, validateToken, updatePassword } from '@/api/usuarios'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      emailOlvidarPassword: '',
      tokenResponse: null,
      token: null,
      result: null,
      newPassword: null,
      newPassword2: null
    }
  },
  mounted() {

  },
  methods: {
    async handleRegisterNewPassword() {
      this.showRegisterToken = false
      this.showLogin = true
      this.showSendToken = false
      this.showRegisterNewPassword = false
      if (this.newPassword === this.newPassword2) {
        const respuesta = await updatePassword(this.emailOlvidarPassword, this.newPassword)
        if (respuesta.result) {
          this.$message({
            type: 'success',
            message: 'Contraseña actualizada'
          })
        } else {
          this.$message({
            type: 'error',
            message: 'Error en la actualización de la contraseña'
          })
        }
      }
    },
    async handleRegisterToken() {
      console.log(this.tokenResponse)
      if (this.tokenResponse.register > 0) {
        this.showLogin = false
        this.showSendToken = false
        this.result = await validateToken(this.tokenResponse.register, this.token)
        if (this.result.result !== 'tokenCorrect') {
          this.$message({
            type: 'error',
            message: 'Token inválido'
          })
          return
        }
        console.log('Ya pasó el validate')
        this.showRegisterToken = false
        this.showRegisterNewPassword = true
      }
    },
    async handleSendToken() {
      if (this.isValidEmail()) {
        this.showRegisterToken = true
        this.showLogin = false
        this.showSendToken = false
        this.showRegisterNewPassword = false
        this.tokenResponse = await sendToken(this.emailOlvidarPassword)
        console.log(this.tokenResponse.register)
      } else {
        this.$message({
          type: 'error',
          message: 'Email inválido'
        })
      }
    },
    isValidEmail() {
      return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.emailOlvidarPassword)
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#aaaaaa;
$dark_gray:#999999;
$light_gray:#b6b6b6;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url("https://images.unsplash.com/photo-1518699705938-d9be21ec6ff6");
  background-repeat:no-repeat;
  background-size:cover;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 410px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: rgb(224, 224, 224);
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
