<template>
  <div class="app-container">
    <el-collapse-transition>
      <div v-show="!permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          No tiene permiso para gestionar las cuentas
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="permiso">
        <div class="busqueda-container">
          <el-row style="padding-left: 1%;">
            <el-col :span="24">
              <div class="filter-conteiner">
                <el-col :span="14">
                  <el-input v-model="busqueda.names" clearable placeholder="Nombres" style="width: 190px;" class="filter-item" />
                  <el-input v-model="busqueda.lastNames" clearable placeholder="Apellidos" style="width: 190px;" class="filter-item" />
                  <el-input v-model="busqueda.documentNumber" clearable placeholder="Número de documento" style="width: 190px;" class="filter-item" />
                </el-col>
                <el-col :span="10">
                  <el-button-group class="busqueda-item">
                    <el-button type="info" icon="el-icon-search" @click="getCuentas()"> Buscar </el-button>
                    <el-button type="info" @click="toggleBusquedaAvanzada">+</el-button>
                  </el-button-group>
                  <el-button class="busqueda-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push('/cuentas/agregar-cuenta')">
                    Añadir
                  </el-button>
                  <el-button class="busqueda-item" type="warning" icon="el-icon-download" @click="handleDownload">
                    Exportar
                  </el-button><br>
                </el-col>
              </div><br>
            </el-col>
          </el-row>
          <el-collapse-transition>
            <div v-show="showBusquedaAvanzada">
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="filter-conteiner">
                    <el-row>
                      <el-col :span="14">
                        <el-select v-model="busqueda.state" clearable style="width: 190px;" placeholder="Estado" class="filter-item">
                          <el-option v-for="item in TiposEstado" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-date-picker v-model="busqueda.startDate" style="width: 235px;" type="date" placeholder="Fecha de registro inicial" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="filter-item" />
                        <el-date-picker v-model="busqueda.endDate" style="width: 235px;" type="date" placeholder="Fecha de registro final" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="filter-item" />
                      </el-col>
                    </el-row>
                  </div><br>
                </el-col>
              </el-row>
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="filter-conteiner">
                    <el-row>
                      <el-col :span="14">
                        <el-input v-model="busqueda.startBalance" clearable placeholder="Saldo Mínimo" style="width: 190px;" class="filter-item" />
                        <el-input v-model="busqueda.endBalance" clearable placeholder="Saldo Máximo" style="width: 190px;" class="filter-item" />
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </div><br>
        <el-button type="warning" icon="el-icon-upload" @click="handleUpload"> Carga de cuentas </el-button>
        <br>
        <br>
        <el-table v-loading="listLoading" height="67vh" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column fixed sortable align="center" label="Número de documento" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.dni }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="names" sortable align="left" label="Nombres" width="160px" />
          <el-table-column sortable align="left" label="Apellidos" width="200px">
            <template slot-scope="scope">
              <span>{{ scope.row.firstLastName + ' ' + scope.row.secondLastName }}</span>
            </template>
          </el-table-column>
          <el-table-column width="194px" align="center" label="Número de cuenta">
            <template slot-scope="scope">
              <span>{{ scope.row.accountNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column width="194px" align="center" label="Tipo de cuenta">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column width="170px" align="center" label="Fecha de apertura">
            <template slot-scope="scope">
              <span>{{ scope.row.openDate | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column width="170px" align="center" label="Fecha de caducidad">
            <template slot-scope="scope">
              <span>{{ scope.row.closeDate | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="Moneda">
            <template slot-scope="scope">
              <span>{{ scope.row.currency }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="Saldo">
            <template slot-scope="scope">
              <span>{{ scope.row.balance }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="CCI">
            <template slot-scope="scope">
              <span>{{ scope.row.CCI }}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="Estado">
            <template slot-scope="scope">
              <span>{{ (scope.row.active)? 'Activa':'Inactiva' }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="Acciones" width="90">
            <template slot-scope="{row}">
              <el-button-group v-show="row.active===1 ? true : false">
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

import { busquedaCuentas, deactivateCuenta } from '@/api/cuentas'
// import { searchPersona } from '@/api/personas'
import moment from 'moment'

export default {
  name: 'CuentasSimples',
  filters: {
    moment(date) {
      if (date !== 'None') {
        return moment(date).format('DD/MM/YYYY')
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      permiso: true,
      list: null,
      listLoading: true,
      showBusquedaAvanzada: false,
      TiposMoneda: ['Soles', 'Dólares'],
      cuenta: {
        dni: undefined,
        accountNumber: '',
        balance: '',
        type: '',
        currency: '',
        openDate: '',
        closeDate: '',
        active: '',
        CCI: '',
        names: '',
        firstLastName: '',
        secondLastName: ''
      },
      TiposEstado: [{
        value: '1',
        label: 'Activa'
      }, {
        value: '0',
        label: 'Inactiva'
      }],
      busqueda: {
        documentNumber: '',
        names: '',
        lastNames: '',
        startDate: '',
        endDate: '',
        startBalance: '',
        endBalance: '',
        state: ''
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }]
      }
    }
  },
  created() {
    const accesos = this.$store.getters.permisos.accesses
    if (accesos === undefined) {
      this.permiso = false
    } else {
      this.permiso = (accesos.find(o => o.name === 'Gestión Cuentas de Ahorro') !== undefined)
    }
    this.getCuentas()
  },
  methods: {
    async getCuentas() {
      this.listLoading = true
      if (this.busqueda.startDate === null) {
        this.busqueda.startDate = ''
      }
      if (this.busqueda.endDate === null) {
        this.busqueda.endDate = ''
      }
      const cuentas = await busquedaCuentas(this.busqueda)
      console.log(cuentas)
      this.list = cuentas
      this.listLoading = false
    },
    handleUpload() {
      this.$router.push({ name: '/carga-masiva', params: { table: 'Cuentas' }})
    },
    async handleDelete(row) {
      this.$confirm('Esta acción desactivará permanentemente a la cuenta. ¿Continuar?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        this.temp = Object.assign({}, row)
        deactivateCuenta(this.temp.accountNumber).then((result) => {
          this.$message({
            type: 'success',
            message: 'Desactivación exitosa'
          })
          row.active = 0
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
    deleteRow(row) {
      this.dialogFormVisible = false
      this.$notify({
        title: 'Exito',
        message: 'Eliminación exitosa',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    toggleBusquedaAvanzada() {
      this.showBusquedaAvanzada = !this.showBusquedaAvanzada
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/excel/Export2Excel').then(excel => {
        const tHeader = ['Dni del cliente', 'Número de cuenta', 'Moneda', 'Saldo', 'Fecha de apertura', 'Fecha de cierre', 'CCI', 'Activo']
        const filterVal = ['dni', 'accountNumber', 'currency', 'balance', 'openDate', 'closeDate', 'CCI', 'Active']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'cuentas-simples'
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

<style scoped>
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
}
.busqueda-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin-left: 10px;
}
.busqueda-fila-container {
    position: relative;
    margin-bottom: 10px;
}
</style>
