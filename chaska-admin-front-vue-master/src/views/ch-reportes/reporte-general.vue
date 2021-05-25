<template>
  <div class="app-container">
    <el-collapse-transition>
      <div v-show="!permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          No tiene permiso para generar los reportes
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          Reporte general
        </div>
        <el-form ref="FormPrestamo" class="form-container">
          <fieldset>
            <legend>Cuentas</legend>
            <div class="crearCliente-main-container" style="margin-top: 15px;">
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="nuevaInfo-container">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label-width="35%" width="60%" label="Número de cuentas" class="formCliente-container-item">
                          <el-input v-model="numCuentas" disabled style="width: 90%;" placeholder="Número" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </fieldset>
          <fieldset>
            <legend>Préstamos</legend>
            <div class="crearCliente-main-container" style="margin-top: 15px;">
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="nuevaInfo-container">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label-width="50%" width="60%" label="Préstamos otorgados" class="formCliente-container-item">
                          <el-input v-model="prestamosOtorgados" disabled style="width: 90%;" placeholder="Número" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="50%" width="60%" label="Préstamos rechazados" class="formCliente-container-item">
                          <el-input v-model="prestamosRechazados" disabled style="width: 90%;" placeholder="Número" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="50%" width="60%" label="Préstamos vencidos" class="formCliente-container-item">
                          <el-input v-model="prestamosVencidos" disabled style="width: 90%;" placeholder="Número" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </fieldset>
        </el-form>
      </div>
    </el-collapse-transition>
    <br>
  </div>
</template>

<script>

export default {
  name: 'ReporteGeneral',
  data() {
    return {
      permiso: true,
      numCuentas: '',
      prestamosOtorgados: '',
      prestamosRechazados: '',
      prestamosVencidos: ''
    }
  },
  created() {
    const accesos = this.$store.getters.permisos.accesses
    this.permiso = (accesos.find(o => o.name === 'Reportes') !== undefined)
  },
  methods: {
    handleUpload() {
      return
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.crearCliente-container {
  position: relative;
  .crearCliente-main-container {
    padding: 40px 45px 20px 50px;
    .nuevaInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .formCliente-container-item {
        float: right;
      }
    }
  }
}

fieldset {
    margin: 8px;
    border: 1px solid silver;
    padding: 8px;
    border-radius: 4px;
}

legend {
    padding: 10px;
    font-size: medium;
}

.boton-continuar {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 20px;
}

</style>
