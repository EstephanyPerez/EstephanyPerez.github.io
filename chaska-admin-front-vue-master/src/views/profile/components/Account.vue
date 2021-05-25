<template>
  <el-form>
    <el-form-item label="Nombres">
      <el-input v-model.trim="user.name" disabled />
    </el-form-item>
    <el-form-item label="Apellidos">
      <el-input v-model.trim="user.lastName" disabled />
    </el-form-item>
    <el-form-item label="DNI">
      <el-input v-model.trim="user.idNumber" disabled />
    </el-form-item>
    <el-form-item label="Teléfono">
      <el-input v-model.trim="user.mobileNumber" disabled />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" disabled />
    </el-form-item>
    <el-form-item label="Dirección">
      <el-input v-model.trim="user.address" disabled />
    </el-form-item>
  </el-form>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      user: {}
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
    }
  }
}
</script>
