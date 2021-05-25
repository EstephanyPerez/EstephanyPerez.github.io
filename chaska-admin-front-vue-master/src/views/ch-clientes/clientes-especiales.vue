<template>
  <div class="app-container">
    <el-collapse-transition>
      <div v-show="!permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          No tiene permiso para gestionar los clientes especiales
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="permiso">
        <div class="busqueda-container">
          <el-row style="padding-left: 1%;">
            <el-col :span="24">
              <div class="busqueda-fila-container">
                <el-row>
                  <el-col :span="14">
                    <el-input v-model="busqueda.names" clearable placeholder="Nombres" style="width: 190px;" class="busqueda-item" />
                    <el-input v-model="busqueda.lastNames" clearable placeholder="Apellidos" style="width: 190px;" class="busqueda-item" />
                    <el-input v-model="busqueda.documentNumber" clearable placeholder="Número de documento" style="width: 190px;" class="busqueda-item" />
                  </el-col>
                  <el-col :span="10">
                    <el-button-group class="busqueda-item">
                      <el-button type="info" icon="el-icon-search" @click="getClientesEspeciales"> Buscar </el-button>
                      <el-button type="info" @click="toggleBusquedaAvanzada">+</el-button>
                    </el-button-group>
                    <el-button class="busqueda-item" type="warning" icon="el-icon-download" @click="handleDownload"> Exportar </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-collapse-transition>
            <div v-show="showBusquedaAvanzada">
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="busqueda-fila-container">
                    <el-row>
                      <el-col :span="14">
                        <el-date-picker v-model="busqueda.startDate" style="width: 190px;" type="date" placeholder="Inicio de Registro" :picker-options="pickerOptions" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
                        <el-date-picker v-model="busqueda.endDate" style="width: 190px;" type="date" placeholder="Fin de Registro" :picker-options="pickerOptions" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
                        <el-date-picker v-model="busqueda.birthday" style="width: 190px;" type="date" placeholder="Fecha de nacimiento" :picker-options="pickerOptions" format="dd/MM/yyyy" value-format="dd-MM-yyyy" class="busqueda-item" />
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </div>
        <el-button class="busqueda-item" type="warning" icon="el-icon-upload" @click="handleUpload"> Carga de clientes especiales </el-button>
        <br>
        <br>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column fixed align="center" prop="specialClientID" sortable label="Id" width="80" />
          <el-table-column width="190px" prop="names" align="left" label="Nombres" />
          <el-table-column width="190px" align="left" label="Apellidos" prop="fullName">
            <template slot-scope="scope">
              <span>{{ scope.row.firstLastName + ' ' + scope.row.secondLastName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="documentName" label="Tipo de documento" width="180px" />
          <el-table-column align="center" prop="documentNumber" label="Nro de documento" width="180px" />

          <el-table-column width="170px" align="center" label="Fecha de registro">
            <template slot-scope="scope">
              <span>{{ scope.row.registerDate | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column width="170px" align="center" label="Fecha de alta">
            <template slot-scope="scope">
              <span>{{ scope.row.releaseDate | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column width="170px" align="center" label="Fecha de nacimiento">
            <template slot-scope="scope">
              <span>{{ scope.row.birthday }}</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" width="180px" align="center" label="Motivo">
            <template slot-scope="scope">
              <span>{{ scope.row.reasonDescription }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import { busquedaClientesEspeciales } from '@/api/clientes'
import moment from 'moment'

export default {
  name: 'ClientesEspeciales',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  data() {
    return {
      permiso: true,
      list: null,
      listLoading: false,
      showBusquedaAvanzada: false,
      downloadLoading: false,
      uploadLoading: false,
      busqueda: {
        documentNumber: '',
        names: '',
        lastNames: '',
        birthday: '',
        startDate: '',
        endDate: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: 'Hoy',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: 'Ayer',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: 'Hace 7 días',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  created() {
    const accesos = this.$store.getters.permisos.accesses
    this.permiso = (accesos.find(o => o.name === 'Gestión Clientes Especiales') !== undefined)
    this.getClientesEspeciales()
  },
  methods: {
    async getClientesEspeciales() {
      this.listLoading = true
      if (this.busqueda.birthday === null) {
        this.busqueda.birthday = ''
      }
      if (this.busqueda.startDate === null) {
        this.busqueda.startDate = ''
      }
      if (this.busqueda.endDate === null) {
        this.busqueda.endDate = ''
      }
      this.list = await busquedaClientesEspeciales(this.busqueda)
      this.listLoading = false
    },
    toggleBusquedaAvanzada() {
      this.showBusquedaAvanzada = !this.showBusquedaAvanzada
    },
    handleUpload() {
      this.$router.push({ name: '/carga-masiva', params: { table: 'Clientes especiales' }})
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/excel/Export2Excel').then(excel => {
        const tHeader = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'DNI', 'Fecha de registro', 'Fecha de salida', 'Motivo']
        const filterVal = ['names', 'firstLastName', 'secondLastName', 'documentNumber', 'registerDate', 'releaseDate', 'reasonID']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'lista-negra'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
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
