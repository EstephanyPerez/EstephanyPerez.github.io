<template>
  <div class="app-container">
    <el-collapse-transition>
      <div v-show="!permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          No tiene permiso para gestionar los préstamos
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="permiso">
        <div class="busqueda-container">
          <el-row style="padding-left: 1%;">
            <el-col :span="24">
              <div>
                <el-row>
                  <el-col :span="14">
                    <el-input v-model="busqueda.names" clearable placeholder="Nombres" style="width: 190px;" class="busqueda-item" />
                    <el-input v-model="busqueda.lastNames" clearable placeholder="Apellidos" style="width: 190px;" class="busqueda-item" />
                    <el-input v-model="busqueda.documentNumber" clearable placeholder="Número de documento" style="width: 190px;" class="busqueda-item" />
                  </el-col>
                  <el-col :span="10">
                    <el-button-group class="busqueda-item">
                      <el-button type="info" icon="el-icon-search" @click="getPrestamos"> Buscar </el-button>
                      <el-button type="info" @click="toggleBusquedaAvanzada">+</el-button>
                    </el-button-group>
                    <el-button class="busqueda-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push('/prestamos/agregar-prestamo')">
                      Añadir
                    </el-button>
                    <el-button class="busqueda-item" type="warning" icon="el-icon-download">
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
                        <el-date-picker v-model="busqueda.startDate" style="width: 290px;" type="date" placeholder="Fecha de registro inicial" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
                        <el-date-picker v-model="busqueda.endDate" style="width: 290px;" type="date" placeholder="Fecha de registro final" format="dd/MM/yyyy" value-format="yyyy-MM-dd" class="busqueda-item" />
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
                        <el-input v-model="busqueda.startAmount" clearable placeholder="Monto mínimo (S/.)" style="width: 290px;" class="busqueda-item" />
                        <el-input v-model="busqueda.endAmount" clearable placeholder="Monto máximo (S/.)" style="width: 290px;" class="busqueda-item" />
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </div><br>
        <el-button type="warning" icon="el-icon-upload" @click="handleUpload"> Carga de Préstamos </el-button>
        <br>
        <br>
        <el-table v-loading="listLoading" height="60vh" :data="list" :default-sort="{prop: 'loanID', order: 'descending'}" border fit highlight-current-row style="width: 100%">
          <el-table-column fixed prop="loanID" sortable width="80px" align="center" label="ID" />
          <el-table-column prop="numDocumento" align="center" label="Número de documento" width="100px" />
          <el-table-column prop="names" sortable align="left" label="Nombres" width="160px" />
          <el-table-column sortable align="left" label="Apellidos" width="200px">
            <template slot-scope="scope">
              <span>{{ scope.row.firstLastName + ' ' + scope.row.secondLastName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="leadID" sortable width="100px" align="center" label="Lead" />
          <el-table-column prop="savingsAccountID" sortable width="100px" align="center" label="Cuenta" />
          <el-table-column prop="currency" sortable width="100px" align="center" label="Moneda" />
          <el-table-column prop="amount" sortable width="100px" align="center" label="Monto" />
          <el-table-column width="100px" sortable align="center" label="TEA">
            <template slot-scope="scope">
              <span>{{ scope.row.TEA.toFixed(2) + ' %' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fees" sortable width="170px" align="center" label="Cuotas mensuales" />
          <el-table-column prop="paymentDay" sortable width="140px" align="center" label="Día de pago" />
          <el-table-column prop="period" sortable width="140px" align="center" label="Periodo" />
          <el-table-column prop="gracePeriods" sortable width="200px" align="center" label="Periodos de gracia" />
          <el-table-column prop="type" sortable width="200px" align="center" label="Tipo" />

          <el-table-column width="170px" sortable align="center" label="Fecha de depósito">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.depositeDate | moment }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="190px" sortable align="center" label="Acciones">
            <template slot-scope="scope">
              <el-button size="mini" type="info" plain @click="verCalendario(scope.row)">
                Reenviar calendario
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import { busquedaPrestamos, sendCalendar } from '@/api/prestamos'
import moment from 'moment'

export default {
  name: 'Prestamos',
  filters: {
    moment(date) {
      if (date !== 'None') {
        return moment(date).format('DD-MM-YY')
      } else {
        return 'Ninguna'
      }
    }
  },
  data() {
    return {
      permiso: true,
      list: null,
      total: 0,
      listLoading: true,
      busqueda: {
        documentNumber: '',
        names: '',
        lastNames: '',
        startDate: '',
        endDate: '',
        startAmount: '',
        endAmount: '',
        page: 1,
        limit: 5
      },
      showBusquedaAvanzada: false
    }
  },
  created() {
    const accesos = this.$store.getters.permisos.accesses
    this.permiso = (accesos.find(o => o.name === 'Gestión Préstamos') !== undefined)
    this.getPrestamos()
  },
  methods: {
    async getPrestamos() {
      this.listLoading = true
      if (this.busqueda.startDate === null) {
        this.busqueda.startDate = ''
      }
      if (this.busqueda.endDate === null) {
        this.busqueda.endDate = ''
      }
      const prestamos = await busquedaPrestamos(this.busqueda)
      this.list = prestamos
      this.listLoading = false
    },
    handleUpload() {
      this.$router.push({ name: '/carga-masiva', params: { table: 'Préstamos' }})
    },
    toggleBusquedaAvanzada() {
      this.showBusquedaAvanzada = !this.showBusquedaAvanzada
    },
    async verCalendario(row) {
      const result = await sendCalendar(row.loanID)
      if (result === 202) {
        this.$message({
          message: 'Calendario de pagos reenviado',
          type: 'success'
        })
      }
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
