<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>Sobre mí</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="usuario.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hey!</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ usuario.name }}</div>
        <div class="user-role text-center text-muted">{{ rol.name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="user" /><span>Nombre</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ usuario.name + ' ' + usuario.lastName }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="star" /><span>Rol</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ rol.name }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="email" /><span>Correo</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ usuario.email }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="message" /><span>Teléfono</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ usuario.mobileNumber }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  },
  data() {
    return {
      usuario: {},
      rol: {}
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'permisos'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.usuario = this.info
      this.rol = this.permisos
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }
</style>
