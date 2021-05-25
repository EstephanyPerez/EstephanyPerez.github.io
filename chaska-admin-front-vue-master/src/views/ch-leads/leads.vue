<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Leads de campaña  N°{{ idCampaign }}
    </div><br>
    <div class="busqueda-container">
      <el-row style="padding-left: 1%;">
        <el-col :span="24">
          <div class="busqueda-fila-container">
            <el-row>
              <el-col :span="11">
                <el-input v-model="busqueda.names" clearable placeholder="Nombres" style="width: 230px;" class="busqueda-item" />
                <el-input v-model="busqueda.lastNames" clearable placeholder="Apellidos" style="width: 230px;" class="busqueda-item" />
              </el-col>
              <el-col :span="13">
                <el-button-group class="busqueda-item">
                  <el-button type="info" icon="el-icon-search" @click="getLeads"> Buscar </el-button>
                  <el-button type="info" @click="toggleBusquedaAvanzada">+</el-button>
                </el-button-group>
                <el-button v-show="activeCampaign==='Activa' ? true : false" type="primary" icon="el-icon-circle-plus-outline" class="busqueda-item" @click="$router.push({ name: '/campañas/leads/agregar-lead', params: { idCampaign: busqueda.campaingID }})"> Añadir </el-button>
                <el-button type="warning" icon="el-icon-download" class="busqueda-item" @click="$router.push('/campañas/leads/agregar-lead')"> Exportar </el-button>
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
                  <el-col :span="11">
                    <el-input v-model="busqueda.documentNumber" clearable placeholder="Nro. de documento" style="width: 230px;" class="busqueda-item" />
                    <el-select v-model="busqueda.state" placeholder="Estado" clearable style="width: 230px" class="busqueda-item">
                      <el-option v-for="item in TiposLead" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </div>
    <el-button v-show="activeCampaign==='Activa' ? true : false" type="warning" icon="el-icon-upload" class="busqueda-item" @click="handleUpload"> Carga de leads </el-button>
    <br>
    <br>
    <el-table v-loading="listLoading" height="67vh" :data="list" :default-sort="{prop: 'campaingID', order: 'descending'}" border fit highlight-current-row style="width: 100%">
      <el-table-column fixed prop="loanLeanID" sortable width="94px" align="center" label="ID" />
      <el-table-column width="100px" sortable prop="documentNumber" align="left" label="DNI" />
      <el-table-column width="190px" sortable prop="names" align="left" label="Nombres" />
      <el-table-column width="190px" align="left" label="Apellidos" prop="fullName">
        <template slot-scope="scope">
          <span>{{ scope.row.firstLastName + ' ' + scope.row.secondLastName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" sortable width="150px" align="center" label="Tipo" />
      <el-table-column prop="currency" sortable width="100px" align="center" label="Moneda" />
      <el-table-column width="220px" align="center" label="Rango de montos">
        <template slot-scope="scope">
          <span>{{ '[ ' + scope.row.minAmount + ' , ' + scope.row.maxAmount + ' ] +/- ' + scope.row.varAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210px" align="center" label="Rango de cuotas (meses)">
        <template slot-scope="scope">
          <span>{{ '[ ' + scope.row.minFees + ' , ' + scope.row.maxFees + ' ] +/- ' + scope.row.varFees }}</span>
        </template>
      </el-table-column>
      <el-table-column width="94px" sortable align="center" label="TEA">
        <template slot-scope="scope">
          <span>{{ scope.row.TEA.toFixed(2) + ' %' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maxGrace" sortable width="350px" align="center" label="Máximo N° de periodos de gracia" />
      <el-table-column prop="state" sortable width="120px" align="center" label="Estado" />
      <el-table-column align="center" fixed="right" width="120px" label="Rechazar lead">
        <template slot-scope="scope">
          <el-button v-show="scope.row.state==='Vigente' ? true : false" size="mini" type="danger" @click="rechazarLead(scope.row)">
            X
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { busquedaLeads, refuseLoanLead } from '@/api/campaigns'

export default {
  name: 'Leads',
  props: {
    idCampaign: {
      type: Number,
      default: 3
    },
    activeCampaign: {
      type: String,
      default: 'active'
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      lead: {
        clientID: null
      },
      TiposLead: ['Aceptado', 'Rechazado', 'Vigente', 'Vencido'],
      showBusquedaAvanzada: false,
      busqueda: {
        campaingID: '',
        documentNumber: '',
        names: '',
        lastNames: '',
        state: ''
      }
    }
  },
  mounted() {
    if (this.idCampaign !== undefined) {
      this.busqueda.campaingID = this.idCampaign
      this.getLeads()
    } else {
      this.$notify({
        title: 'Error',
        message: 'No se ha seleccionado una campaña a visualizar',
        type: 'error',
        duration: 2000
      })
    }
  },
  methods: {
    async getLeads() {
      this.listLoading = true
      const leads = await busquedaLeads(this.busqueda)
      this.list = leads
      this.listLoading = false
    },
    handleUpload() {
      this.$router.push({ name: '/carga-masiva', params: { table: 'Leads' }})
    },
    toggleBusquedaAvanzada() {
      this.showBusquedaAvanzada = !this.showBusquedaAvanzada
    },
    async rechazarLead(row) {
      if (row.state === 'Vigente') {
        this.$confirm('Esta acción rechazará permanenteme el lead seleccionado. ¿Desea continuar?', 'Advertencia', {
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        }).then(() => {
          refuseLoanLead(row.loanLeanID).then((result) => {
            this.getLeads().then(() => {
              this.$message({
                type: 'success',
                message: 'Rechazo completado'
              })
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Rechazo cancelado'
          })
        })
      } else {
        this.$notify({
          title: 'Error',
          message: 'Solo se puede rechazar leads en estado vigente',
          type: 'error',
          duration: 2000
        })
      }
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
