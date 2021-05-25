<template>
  <div class="app-container">
    <el-collapse-transition>
      <div v-show="!permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          No tiene permiso para gestionar los expedientes de venta
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
                    <el-input v-model="busqueda.documentNumber" clearable placeholder="Documento" style="width: 110px;" class="filter-item" />
                    <el-input v-model="busqueda.names" clearable placeholder="Nombres" style="width: 200px;" class="filter-item" />
                    <el-input v-model="busqueda.lastNames" clearable placeholder="Apellidos" style="width: 200px;" class="filter-item" />
                  </el-col>
                  <el-col :span="10">
                    <el-button-group class="busqueda-item">
                      <el-button type="info" icon="el-icon-search" @click="getExpVentas"> Buscar </el-button>
                      <el-button type="info" @click="toggleBusquedaAvanzada">+</el-button>
                    </el-button-group>
                    <el-button class="busqueda-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push('/expVenta/agregar-expVenta')">
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
                        <el-select v-model="busqueda.product" placeholder="Producto" clearable style="width: 180px" class="filter-item">
                          <el-option v-for="item in TiposProducto" :key="item" :label="item" :value="item" />
                        </el-select>
                        <el-select v-model="busqueda.channel" placeholder="Canal" clearable style="width: 165px" class="filter-item">
                          <el-option v-for="item in TiposCanal" :key="item" :label="item" :value="item" />
                        </el-select>
                        <el-select v-model="busqueda.state" placeholder="Estado" clearable style="width: 165px" class="filter-item">
                          <el-option v-for="item in TiposEstado" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select><br><br>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="busqueda-fila-container">
                    <el-row>
                      <el-col :span="14">
                        <el-date-picker v-model="busqueda.startDate" style="width: 245px;" type="date" placeholder="Fecha de registro inicial" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
                        <el-date-picker v-model="busqueda.endDate" style="width: 245px;" type="date" placeholder="Fecha de registro final" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </div><br>
        <el-table v-loading="listLoading" height="67vh" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column fixed align="center" sortable label="Id" width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.salefileID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="documentNumber" sortable align="center" label="Número de documento" width="200px" />
          <el-table-column prop="names" sortable align="left" label="Nombres" width="160px" />
          <el-table-column sortable align="left" label="Apellidos" width="200px">
            <template slot-scope="scope">
              <span>{{ scope.row.firstLastName + ' ' + scope.row.secondLastName }}</span>
            </template>
          </el-table-column>
          <el-table-column width="180px" sortable align="center" label="Producto">
            <template slot-scope="scope">
              <span>{{ scope.row.productType }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120px" sortable align="center" label="Canal">
            <template slot-scope="scope">
              <span>{{ scope.row.channel }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150px" sortable align="center" label="Fecha de venta">
            <template slot-scope="scope">
              <span>{{ scope.row.date | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120px" sortable align="center" label="Estado">
            <template slot-scope="scope">
              <span>{{ TiposEstado[scope.row.state].name }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="Acciones" width="180px">
            <template slot-scope="{row}">
              <el-button-group>
                <el-button type="success" size="mini" icon="el-icon-check" @click="handleAccept(row)" />
                <el-button type="danger" size="mini" icon="el-icon-close" @click="handleDecline(row)" />
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import { busquedaExpVentas, updateExpVentasStatus } from '@/api/expVenta'
import moment from 'moment'

export default {
  name: 'ExpVenta',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  data() {
    return {
      permiso: true,
      valorA: '',
      list: null,
      listLoading: true,
      showBusquedaAvanzada: false,
      TiposDoc: ['DNI', 'Carné de extranjería'],
      TiposEstado: [{ id: 0, name: 'Pendiente' }, { id: 1, name: 'Aprobado' }, { id: 2, name: 'Rechazado' }],
      TiposProducto: ['Préstamo', 'Cuenta de Ahorros'],
      TiposCanal: ['Virtual', 'Físico'],
      data: {
        saleFile: '',
        newStatus: -1
      },
      temp: {
        salefileID: undefined,
        documentName: '',
        client: '',
        names: '',
        firstLastName: '',
        secondLastName: '',
        lastName: '',
        productID: '',
        productType: '',
        channel: '',
        date: '',
        state: ''
      },
      busqueda: {
        documentNumber: '',
        names: '',
        lastNames: '',
        product: '',
        channel: '',
        startDate: '',
        endDate: '',
        state: ''
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }]
      }
    }
  },
  created() {
    const accesos = this.$store.getters.permisos.accesses
    this.permiso = (accesos.find(o => o.name === 'Gestión Expedientes de Venta') !== undefined)
    this.valorA = null
    this.getExpVentas()
  },
  methods: {
    async getExpVentas() {
      this.listLoading = true
      if (this.busqueda.startDate === null) {
        this.busqueda.startDate = ''
      }
      if (this.busqueda.endDate === null) {
        this.busqueda.endDate = ''
      }
      const expVentas = await busquedaExpVentas(this.busqueda)
      this.list = expVentas
      this.listLoading = false
    },
    toggleBusquedaAvanzada() {
      this.showBusquedaAvanzada = !this.showBusquedaAvanzada
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
    },
    async handleAccept(row) {
      if (!row.state) {
        this.data.saleFile = row.salefileID
        this.data.newStatus = 1
        const temp = await updateExpVentasStatus(this.data)
        if (temp) {
          row.state = 1
          this.$notify({
            title: 'Éxito',
            message: 'Aprobado',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Error',
            message: 'No se ha actualizado el estado',
            type: 'error',
            duration: 2000
          })
        }
      }
    },
    async handleDecline(row) {
      if (!row.state) {
        this.data.saleFile = row.salefileID
        this.data.newStatus = 2
        const temp = await updateExpVentasStatus(this.data)
        if (temp) {
          row.state = 2
          this.$notify({
            title: 'Éxito',
            message: 'Rechazado',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Error',
            message: 'No se ha actualizado el estado',
            type: 'error',
            duration: 2000
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
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
