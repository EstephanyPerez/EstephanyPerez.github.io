<template>
  <div>
    <el-button type="info" icon="el-icon-message" @click="handleSendToken">
      Enviar token a {{ user.email }}
    </el-button>
    <el-form class="form-container">
      <el-collapse-transition>
        <div v-show="showToken">
          <el-form-item label="Token">
            <el-input v-model="token" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="handleSubmitToken">
            Confirmar token
          </el-button>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="showPassword">
          <el-form-item label="Nueva contraseña">
            <el-input :key="passwordType" v-model="newPassword" :type="passwordType" />
          </el-form-item>
          <el-form-item label="Vueva a ingresar su nueva contraseña">
            <el-input :key="passwordType" v-model="secondNewPassword" :type="passwordType" />
          </el-form-item>
          <el-button type="success" icon="el-icon-check" @click="handleChangePassword">
            Cambiar contraseña
          </el-button>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { sendToken, validateToken, updatePassword } from '@/api/usuarios'

export default {
  data() {
    return {
      user: {},
      showToken: false,
      showPassword: false,
      token: '',
      password: '',
      newPassword: '',
      secondNewPassword: '',
      tokenResponse: null,
      result: null
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = this.info
    },
    async handleSendToken() {
      this.showToken = true
      console.log(this.user.email)
      this.tokenResponse = await sendToken(this.user.email)
      console.log(this.tokenResponse.register)
    },
    async handleSubmitToken() {
      this.result = await validateToken(this.tokenResponse.register, this.token)
      if (this.result.result !== 'tokenCorrect') {
        this.$message({
          type: 'error',
          message: 'Token inválido'
        })
        return
      }
      this.showPassword = true
      this.showToken = false
    },
    async handleChangePassword() {
      if (this.newPassword !== this.secondNewPassword) {
        this.$message({
          message: 'Las nuevas contraseñas no son iguales',
          type: 'error'
        })
        return
      }
      const response = await updatePassword(this.user.email, this.newPassword)
      if (response.result) {
        this.$message({
          message: 'Cambio de contraseña exitoso',
          type: 'success'
        })
        this.showPassword = false
        this.showToken = false
      } else {
        this.$message({
          type: 'error',
          message: 'Error en la actualización de la contraseña'
        })
      }
    }
  }
}
</script>
