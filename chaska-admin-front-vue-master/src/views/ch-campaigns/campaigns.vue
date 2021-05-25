<template>
  <div class="app-container">
    <el-collapse-transition>
      <div v-show="!permiso">
        <div style="margin:0 0 5px 20px; font-size: x-large">
          No tiene permiso para gestionar las campañas
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="permiso">
        <el-button type="warning" icon="el-icon-upload" @click="handleUpload"> Carga de campañas </el-button>
        <br>
        <br>
        <el-table v-loading="listLoading" height="50vh" :data="list" :default-sort="{prop: 'campaingID', order: 'descending'}" border fit highlight-current-row style="width: 831px" :row-class-name="tableRowClassName">
          <el-table-column fixed prop="campaingID" sortable width="90px" align="center" label="ID" />

          <el-table-column prop="FirstDate" width="170px" sortable align="center" label="Fecha de inicio">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.startDate | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="LastDate" width="170px" sortable align="center" label="Fecha de fin">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.endDate | moment }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="CountLeads" width="170px" sortable align="center" label="N° Leads">
            <template slot-scope="scope">
              <span>{{ scope.row.leadsCount }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="State" width="110px" sortable align="center" label="Estado">
            <template slot-scope="scope">
              <span>{{ (scope.row.state)? 'Activa':'Inactiva' }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="Details" align="center" label="Detalles" width="120px">
            <template slot-scope="{row}">
              <el-button type="info" plain size="mini" icon="el-icon-more" @click="handleDetails(row)" />
            </template>
          </el-table-column>
        </el-table>
        <br>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import { getAllCampaigns } from '@/api/campaigns'
import moment from 'moment'

export default {
  name: 'Campaigns',
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
      list: null,
      listLoading: true,
      permiso: true
    }
  },
  created() {
    const accesos = this.$store.getters.permisos.accesses
    this.permiso = (accesos.find(o => o.name === 'Gestión Campañas') !== undefined)
    this.getCampaigns()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.state === 1) {
        return 'success-row'
      }
      return ''
    },
    handleUpload() {
      this.$router.push({ name: '/carga-masiva', params: { table: 'Campañas' }})
    },
    async getCampaigns() {
      this.listLoading = true
      const campaigns = await getAllCampaigns()
      this.list = campaigns
      this.listLoading = false
    },
    handleDetails(row) {
      const rowtemp = Object.assign({}, row)
      // this.$router.push({ name: 'editar-cliente', params: { clientDNI: atemp.documentNumber }})
      this.$router.push({ name: '/campañas/leads', params: { idCampaign: rowtemp.campaingID, activeCampaign: (rowtemp.state) ? 'Activa' : 'Inactiva' }})
    }
  }
}
</script>

<style scoped>

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
