<template>
  <div class="dashboard-editor-container">
    <h2> {{ getBienvenida() }} </h2>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h5> Clientes registrados</h5>
          <BarrasClientes />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h5> Préstamos por estado</h5>
          <PiePrestamos />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <h5> Cuentas activas</h5>
          <BarrasCuentas />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarrasClientes from './components/BarrasClientes'
import BarrasCuentas from './components/BarrasCuentas'
import PiePrestamos from './components/PiePrestamos'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardAdmin',
  components: {
    BarrasCuentas,
    BarrasClientes,
    PiePrestamos
  },
  data() {
    return {
      usuario: {}
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  created() {
    this.usuario = this.info
  },
  methods: {
    getBienvenida() {
      if (this.usuario.name === undefined) {
        return 'Bienvenido!'
      }
      let inicio = 'Bienvenido, '
      if (this.usuario.sex === 'F') {
        inicio = 'Bienvenida, '
      }
      return inicio + this.usuario.name
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
