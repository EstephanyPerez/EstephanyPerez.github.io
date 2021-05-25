<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Historial" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Cuenta" name="cuenta">
                <account />
              </el-tab-pane>
              <el-tab-pane label="Permisos" name="permisos">
                <el-table :data="userpermisos" style="width: 100%;" border>
                  <el-table-column width="250px" prop="name" align="left" label="Permiso" />
                  <el-table-column width="450px" prop="description" align="left" label="Descripción" />
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="Cambiar contraseña" name="changePassword">
                <ChangePassword />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import ChangePassword from './components/ChangePassword'

export default {
  name: 'Perfil',
  components: { UserCard, Timeline, Account, ChangePassword },
  data() {
    return {
      user: {},
      activeTab: 'timeline',
      userpermisos: {}
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'roles',
      'info',
      'permisos'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.info.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
      this.userpermisos = this.permisos.accesses
    }
  }
}
</script>
