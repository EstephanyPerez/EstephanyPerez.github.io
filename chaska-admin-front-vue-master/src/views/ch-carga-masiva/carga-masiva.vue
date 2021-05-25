<template>
  <div class="app-container">
    <div style="margin:0 0 5px 5px; font-size: x-large">
      Carga masiva de {{ table }}
    </div><br>
    <el-collapse-transition>
      <div v-show="!showDatos">
        <el-button style="margin:0 0 5px 5px;" class="busqueda-item" type="success" icon="el-icon-download" @click="handlePlantilla"> Descargar plantilla </el-button>
        <br><upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="showDatos">
        <div class="busqueda-container">
          <el-row style="padding-left: 1%;">
            <el-col :span="24">
              <div class="busqueda-fila-container">
                <el-row>
                  <el-col :span="8">
                    <el-button class="busqueda-item" type="danger" icon="el-icon-close" @click="$router.push('/')"> Cancelar </el-button>
                  </el-col>
                  <el-col :span="11">
                    <el-date-picker v-model="timeToProcess" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Programar carga" />
                  </el-col>
                  <el-col :span="5">
                    <el-button class="busqueda-item" type="success" icon="el-icon-upload" @click="subirAlBack"> Programar carga </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-collapse-transition>
          <div v-show="isCampaign">
            <el-date-picker v-model="campaign.startDate" style="width: 235px;" type="date" placeholder="Inicio de campaña" value-format="yyyy-MM-dd" class="busqueda-item" />
            <el-date-picker v-model="campaign.endDate" style="width: 235px;" type="date" placeholder="Fin de campaña" value-format="yyyy-MM-dd" class="busqueda-item" />
          </div>
        </el-collapse-transition>
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { loadCampaign } from '@/api/campaigns'
import { loadLoans } from '@/api/prestamos'
import { loadSpecialClients } from '@/api/clientes'
import { loadAccounts } from '@/api/cuentas'

export default {
  name: 'Leads',
  components: { UploadExcelComponent },
  props: {
    table: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabla: {
        name: null
      },
      tableData: [],
      tableHeader: [],
      showDatos: false,
      fechaCarga: null,
      tHeader: [],
      tData: [],
      tFilename: 'plantilla-',
      isCampaign: false,
      timeToProcess: null,
      campaign: {
        startDate: null,
        endDate: null,
        timeToProcess: null,
        leads: []
      },
      loans: {
        timeToProcess: null,
        loans: []
      },
      specialClients: {
        timeToProcess: null,
        specialClients: []
      },
      accounts: {
        timeToProcess: null,
        accounts: []
      }
    }
  },
  mounted() {
    if (this.table !== '') {
      this.tabla.name = this.table
      if (this.table === 'Clientes especiales') {
        this.tHeader = ['CodPersona', 'ApellidoPaterno', 'ApellidoMaterno', 'Nombres', 'Sexo', 'FechaNacimiento', 'FechaRegistro', 'FechaAlta', 'CodRazon']
        this.tData = [{
          CodPersona: '12312312',
          ApellidoPaterno: 'Ulloa',
          ApellidoMaterno: 'Coronado',
          Nombres: 'Adrian Eduardo',
          Sexo: 'M',
          FechaNacimiento: '28/05/1999',
          FechaRegistro: '28/05/1999',
          FechaAlta: '28/05/1999',
          CodRazon: 'R3'
        }]
        this.tFilename = 'plantilla-clientes-especiales'
      }
      if (this.table === 'Campañas') {
        this.isCampaign = true
        this.tHeader = ['CodCliente', 'TipoProducto', 'Moneda', 'MontoMinimo', 'MontoMaximo', 'VarMonto', 'PlazoMinimo', 'PlazoMaximo', 'VarPlazo', 'Tasa', 'GraciaMaxima']
        this.tData = [{
          CodCliente: '72074725',
          TipoProducto: 'PE',
          Moneda: 'SOL',
          MontoMinimo: '200',
          MontoMaximo: '1000',
          VarMonto: '200',
          PlazoMinimo: '6',
          PlazoMaximo: '60',
          VarPlazo: '2',
          Tasa: '13',
          GraciaMaxima: '0'
        }]
        this.tFilename = 'plantilla-campañas'
      }
      if (this.table === 'Cuentas') {
        this.tHeader = ['CodCliente', 'Moneda', 'Tipo']
        this.tData = [{
          CodCliente: 'dni',
          Moneda: 'SOL/DOL',
          Tipo: 'CS/CM/CST'
        }]
        this.tFilename = 'plantilla-cuentas'
      }
      if (this.table === 'Préstamos') {
        this.tHeader = ['CodCliente', 'CodCuenta', 'Monto', 'Moneda', 'Cuotas', 'Tipo', 'TEA', 'PeriodosGracia']
        this.tData = [{
          CodCliente: '12312312',
          CodCuenta: '10001221010',
          Moneda: 'SOL',
          Monto: 123,
          Cuotas: 12,
          Tipo: 'PE',
          TEA: 12,
          PeriodosGracia: ''
        }]
        this.tFilename = 'plantilla-prestamos'
      }
    } else {
      this.$notify({
        title: 'Error',
        message: 'No se ha seleccionado una tabla a cargar',
        type: 'error',
        duration: 2000
      })
    }
  },
  methods: {
    handlePlantilla() {
      import('@/vendor/Export2Excel').then(excel => {
        const data = this.formatJson(this.tHeader, this.tData)
        excel.export_json_to_excel({
          header: this.tHeader,
          data,
          filename: this.tFilename
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    beforeUpload(file) {
      // const isLt1M = file.size / 1024 / 1024 < 15
      return true
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      this.showDatos = true
    },
    async subirAlBack() {
      console.log(this.table)
      if (this.table === 'Campañas') {
        this.campaign.timeToProcess = this.timeToProcess
        this.campaign.leads = this.tableData
        if (this.campaign.startDate === null || this.campaign.endDate === null || this.campaign.startDate > this.campaign.endDate || this.campaign.timeToProcess === null) {
          this.$message({
            type: 'error',
            message: 'Seleccionar inicio, fin de campaña y hora de carga'
          })
        } else {
          await this.subirAlBackCampaigns()
        }
        return
      }
      if (this.table === 'Préstamos') {
        this.loans.timeToProcess = this.timeToProcess
        this.loans.loans = this.tableData
        if (this.loans.timeToProcess === null) {
          this.$message({
            type: 'error',
            message: 'Seleccionar hora de carga'
          })
        } else {
          await this.subirAlBackPrestamos()
        }
        return
      }
      if (this.table === 'Clientes especiales') {
        this.specialClients.timeToProcess = this.timeToProcess
        console.log(this.specialClients.timeToProcess)
        this.specialClients.specialClients = this.tableData
        if (this.specialClients.timeToProcess === null) {
          this.$message({
            type: 'error',
            message: 'Seleccionar hora de carga'
          })
        } else {
          await this.subirAlBackClientesEspeciales()
        }
        return
      }
      if (this.table === 'Cuentas') {
        this.accounts.timeToProcess = this.timeToProcess
        this.accounts.accounts = this.tableData
        if (this.accounts.timeToProcess === null) {
          this.$message({
            type: 'error',
            message: 'Seleccionar hora de carga'
          })
        } else {
          await this.subirAlBackCuentasSimples()
        }
        return
      }
    },
    async subirAlBackPrestamos() {
      const result = await loadLoans(this.loans)
      if (result.result > 0) {
        this.$message({
          showClose: true,
          message: 'Carga de préstamos exitosa',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: 'Carga de préstamos fallida',
          type: 'error'
        })
      }
      this.showDatos = false
    },
    async subirAlBackCampaigns() {
      for (var i in this.campaign.leads) {
        this.campaign.leads[i].CodCliente = this.campaign.leads[i].CodCliente.toString()
      }
      console.log(JSON.stringify(this.campaign))
      const result = await loadCampaign(this.campaign)
      if (result.result > 0) {
        this.$message({
          showClose: true,
          message: 'Carga de campaña exitosa',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: 'Carga de campaña fallida',
          type: 'error'
        })
      }
      this.showDatos = false
    },
    async subirAlBackClientesEspeciales() {
      const result = await loadSpecialClients(this.specialClients)
      if (result.result > 0) {
        this.$message({
          showClose: true,
          message: 'Carga de clientes especiales exitosa',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: 'Carga de clientes especiales fallida',
          type: 'error'
        })
      }
      this.showDatos = false
    },
    async subirAlBackCuentasSimples() {
      const result = await loadAccounts(this.accounts)
      if (result.result > 0) {
        this.$message({
          showClose: true,
          message: 'Carga de cuentas exitosa',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: 'Carga de cuentas fallida',
          type: 'error'
        })
      }
      this.showDatos = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.busqueda-container {
  margin-top: 15px;
  padding: 4px 4px 2px 5px;
  .busqueda-fila-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .busqueda-item {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
        margin-left: 10px;
      }
    }
}

</style>
