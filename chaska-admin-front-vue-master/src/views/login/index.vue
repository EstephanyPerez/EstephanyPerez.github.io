<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <el-collapse-transition>
        <div v-show="showLogin">
          <div class="title-container">
            <h3 class="title">Bienvenido a Chaska</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="Usuario" name="username" type="text" tabindex="1" autocomplete="on" />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="Mayúsculas activadas" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Contraseña"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Iniciar sesión</el-button>
          <el-button :loading="loading" type="info" style="width:100%;margin-bottom:30px;margin-left: 0px;" @click="toggleForgotPassword">Olvidé mi contraseña</el-button>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="showSendToken">
          <div class="title-container">
            <h2 class="title">Recupera tu cuenta</h2>
            <el-form-item>
              <el-input v-model="emailOlvidarPassword" placeholder="Correo" />
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleSendToken">Enviar token</el-button>
          </div>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="showRegisterToken">
          <div class="title-container">
            <h2 class="title">Registra el token</h2>
            <el-form-item>
              <el-input v-model="token" placeholder="Token" />
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleRegisterToken">Continuar</el-button>
          </div>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="showRegisterNewPassword">
          <div class="title-container">
            <h2 class="title">Registrar Nueva Contraseña</h2>
            <el-form-item>
              <el-input :key="passwordType" v-model="newPassword" :type="passwordType" placeholder="Nueva Contraseña" />
              <br>
              <el-input :key="passwordType" v-model="newPassword2" :type="passwordType" placeholder="Repetir Nueva Contraseña" />
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleRegisterNewPassword">Continuar</el-button>
          </div>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>

<script>

import { grantAccesssAdmin, getPermisos, sendToken, validateToken, updatePassword } from '@/api/usuarios'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('El usuario no puede estar en blanco'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('La contraseña no puede estar en blanco'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      showLogin: true,
      showSendToken: false,
      showRegisterToken: false,
      showRegisterNewPassword: false,
      emailOlvidarPassword: '',
      tokenResponse: null,
      token: null,
      result: null,
      newPassword: null,
      newPassword2: null,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
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
    },
    toggleForgotPassword() {
      this.showRegisterToken = false
      this.showLogin = false
      this.showSendToken = true
      this.showRegisterNewPassword = false
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      const info = await grantAccesssAdmin(this.loginForm)
      const auxiliar = {
        username: 'admin',
        password: ''
      }
      if (info.result) {
        this.$store.commit('usuario/llenarInfo', info.user)
        const permisos = await getPermisos(info.user.roleID)
        this.$store.commit('usuario/llenarPermisos', permisos)
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', auxiliar)
              .then(() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$message({
          message: 'Datos no válidos',
          type: 'error'
        })
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
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
