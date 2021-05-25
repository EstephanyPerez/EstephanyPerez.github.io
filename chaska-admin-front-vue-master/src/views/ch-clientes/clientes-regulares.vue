<template>
  <div class="app-container">
    <el-collapse-transition>
      <div v-show="!permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          No tiene permiso para gestionar los clientes
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
                      <el-button type="info" icon="el-icon-search" @click="handleBusqueda"> Buscar </el-button>
                      <el-button type="info" @click="toggleBusquedaAvanzada">+</el-button>
                    </el-button-group>
                    <el-button class="busqueda-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push('/clientes/agregar-cliente')">
                      Añadir
                    </el-button>
                    <el-button class="busqueda-item" type="warning" icon="el-icon-download" @click="handleDownload">
                      Exportar
                    </el-button>
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
                        <el-select v-model="busqueda.state" clearable style="width: 100px;" placeholder="Estado" class="busqueda-item">
                          <el-option v-for="item in TiposEstado" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-date-picker v-model="busqueda.startDate" style="width: 235px;" type="date" placeholder="Fecha de registro inicial" :picker-options="pickerOptions" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
                        <el-date-picker v-model="busqueda.endDate" style="width: 235px;" type="date" placeholder="Fecha de registro final" :picker-options="pickerOptions" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </div>
        <el-table v-loading="listLoading" :default-sort="{prop: 'clientID', order: 'descending'}" height="65vh" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column fixed align="center" prop="clientID" sortable label="Id" width="80" />
          <el-table-column width="190px" prop="names" sortable align="left" label="Nombres" />
          <el-table-column width="190px" align="left" sortable label="Apellidos" prop="fullName">
            <template slot-scope="scope">
              <span>{{ scope.row.firstLastName + ' ' + scope.row.secondLastName }}</span>
            </template>
          </el-table-column>
          <el-table-column width="135px" prop="documentName" sortable align="center" label="Tipo de doc." />
          <el-table-column width="135px" prop="documentNumber" sortable align="center" label="Nro de doc." />
          <el-table-column width="150px" sortable align="center" label="Fecha de registro">
            <template slot-scope="scope">
              <span>{{ scope.row.registerDate | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column width="110px" sortable align="center" label="Estado">
            <template slot-scope="scope">
              <span>{{ (scope.row.isActive)? 'Activo':'Inactivo' }}</span>
            </template>
          </el-table-column>
          <el-table-column width="145px" prop="numberAccounts" sortable align="center" label="N° de cuentas" />

          <el-table-column fixed="right" align="center" label="Acciones" width="180">
            <template slot-scope="{row}">
              <el-button-group v-show="row.isActive===1 ? true : false">
                <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="handleUpdate(row)" />
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row)" />
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import { deactivateCliente, busquedaClientes } from '@/api/clientes'
import moment from 'moment'

export default {
  name: 'ClientesRegulares',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  data() {
    return {
      permiso: false,
      list: null,
      listLoading: true,
      showBusquedaAvanzada: false,
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
      },
      TiposEstado: [{
        value: '1',
        label: 'Activo'
      }, {
        value: '0',
        label: 'Inactivo'
      }],
      busqueda: {
        documentNumber: '',
        names: '',
        lastNames: '',
        startDate: '',
        endDate: '',
        rangoRegistro: '',
        state: ''
      },
      temp: {
        clientID: undefined,
        names: '',
        firstLastName: '',
        secondLastName: '',
        documentName: '',
        documentNumber: '',
        CEM: '',
        registerDate: '',
        isActive: '',
        firstEmail: '',
        secondEmail: '',
        firstPhone: '',
        secondPhone: '',
        firstAddress: '',
        secondAddress: ''
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }]
      }
    }
  },
  created() {
    const accesos = this.$store.getters.permisos.accesses
    this.permiso = (accesos.find(o => o.name === 'Gestión Clientes') !== undefined)
    this.handleBusqueda()
  },
  methods: {
    async getClientes() {
      this.listLoading = true
      const clients = await busquedaClientes(this.busqueda)
      this.list = clients
      this.listLoading = false
    },
    toggleBusquedaAvanzada() {
      this.showBusquedaAvanzada = !this.showBusquedaAvanzada
    },
    async handleBusqueda() {
      this.listLoading = true
      if (this.busqueda.startDate === null) {
        this.busqueda.startDate = ''
      }
      if (this.busqueda.endDate === null) {
        this.busqueda.endDate = ''
      }
      const clients = await busquedaClientes(this.busqueda)
      this.list = clients
      this.listLoading = false
    },
    handleUpdate(row) {
      const atemp = Object.assign({}, row)
      if (row.isActive) {
        this.$router.push({ name: 'editar-cliente', params: { clientDNI: atemp.documentNumber }})
      } else {
        this.$message({
          type: 'error',
          message: 'No se puede modificar los datos de un cliente inactivo'
        })
      }
    },
    async handleDelete(row) {
      this.$confirm('Esta acción desactivará permanentemente al cliente. ¿Continuar?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        this.temp = Object.assign({}, row)
        deactivateCliente(this.temp.clientID).then(() => {
          this.$message({
            type: 'success',
            message: 'Desactivación exitosa'
          })
          row.isActive = 0
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: 'Desactivación no realizada'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Desactivación cancelada'
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/excel/Export2Excel').then(excel => {
        const tHeader = ['Id', 'DNI', 'Nombres', 'Apellido paterno', 'Apellido materno', 'CEM', 'Fecha de registro', 'Estado']
        const filterVal = ['clientID', 'documentNumber', 'names', 'firstLastName', 'secondLastName', 'CEM', 'registerDate', 'isActive']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'clientes-regulares'
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
