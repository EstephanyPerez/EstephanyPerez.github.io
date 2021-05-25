<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Nuevo préstamo
    </div>
    <el-form ref="FormPrestamo" :model="prestamo" class="form-container">
      <fieldset>
        <legend>Cliente</legend>
        <div class="crearCliente-main-container" style="margin-top: 15px;">
          <el-row style="padding-left: 1%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label-width="35%" width="60%" label="Número de documento" class="formCliente-container-item">
                      <el-input v-model="cliente.documentNumber" style="width: 90%;" placeholder="Número">
                        <el-button slot="append" icon="el-icon-search" type="primary" @click="handleBusqueda()" />
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="25%" label="Nombre completo" class="formCliente-container-item">
                      <el-input v-model="cliente.name" disabled style="width: 80%;" placeholder="Nombre" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </fieldset>
      <el-collapse-transition>
        <div v-show="showInfoPrestamo">
          <fieldset>
            <legend>Cuenta a depositar</legend>
            <div class="crearCliente-main-container" style="margin-top: 15px;">
              <el-form-item label-width="18%" width="60%" label="Número de cuenta" class="formCliente-container-item">
                <el-select v-model="loan.savingsAccountID" placeholder="Número de cuenta" label="Cuentas del cliente" clearable style="width: 36%" class="filter-item">
                  <el-option v-for="item in cuentasCliente" :key="item.id" :label="formatoCuenta(item.savingsAccount)" :value="item.savingsAccount" />
                </el-select>
              </el-form-item>
            </div>
          </fieldset>
          <fieldset>
            <legend>Préstamo</legend>
            <div class="crearCliente-main-container">
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="nuevaInfo-container">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label-width="18%" label="TEA" class="formCliente-container-item">
                          <el-input v-model="TEA" disabled style="width: 20%;" placeholder="TEA" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-form-item label-width="10%" width="60%" label="Monto" class="formCliente-container-item">
                <el-slider v-model="loan.amount" :min="parseInt(lead.minAmount)" :max="parseInt(lead.maxAmount)" :step="parseInt(lead.varAmount)" :format-tooltip="formatoMonto" show-stops show-input />
              </el-form-item>
              <el-form-item label-width="10%" width="60%" label="Plazo" class="formCliente-container-item">
                <el-slider v-model="loan.fees" :min="parseInt(lead.minFees)" :max="parseInt(lead.maxFees)" :step="parseInt(lead.varFees)" :format-tooltip="formatoPlazo" show-stops show-input />
              </el-form-item>
              <el-form-item label-width="30%" width="60%" label="Periodos de gracia" class="formCliente-container-item">
                <el-slider v-show="mostrarGracia" v-model="loan.gracePeriods" :min="0" :max="parseInt(lead.maxGrace)" :step="1" :format-tooltip="formatoPlazo" show-stops show-input />
              </el-form-item>
            </div>
          </fieldset>
          <el-form-item>
            <el-button class="boton-continuar" style="margin-left: 35%;" type="danger" icon="el-icon-close" @click="handleCancelar()">
              Cancelar
            </el-button>
            <el-button class="boton-continuar" style="margin-left: 10%;" type="success" icon="el-icon-check" @click="handleAgregar()">
              Añadir
            </el-button>
          </el-form-item>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>

<script>

import { consultClienteByDNI, searchCliente } from '@/api/clientes'
import { consultLoanLeadsByClient } from '@/api/campaigns'
import { getCuentasCliente } from '@/api/cuentas'
import { grantLoan } from '@/api/prestamos'

export default {
  name: 'AgregarPrestamo',
  data() {
    return {
      TEA: '',
      showInfoPrestamo: false,
      prestamo: {
        id: ''
      },
      cliente: {
        documentNumber: '',
        name: ''
      },
      lead: {
        maxAmount: '10',
        minAmount: '0',
        varAmount: '1',
        maxFees: '10',
        minFees: '0',
        varFees: '1',
        maxGrace: '0'
      },
      loan: {
        loanLeadID: '',
        clientID: '',
        savingsAccountID: '',
        amount: 0,
        fees: 0,
        gracePeriods: 0
      },
      cuentasCliente: []
    }
  },
  methods: {
    mostrarGracia() {
      return parseInt(lead.maxGrace)!==0
    },
    formatoCuenta(cuenta) {
      return cuenta.substring(0, 3) + ' ' + cuenta.substring(3, cuenta.length)
    },
    async handleCancelar() {
      this.$router.push('/prestamos')
    },
    async handleAgregar() {
      if (this.loan.savingsAccountID === '') {
        this.$notify({
          title: 'Advertencia',
          message: 'No ha escogido una cuenta de depósito para el préstamo',
          type: 'warning',
          duration: 2000
        })
        return
      }
      const result = await grantLoan(this.loan)
      if (result === true) {
        this.$notify({
          title: 'Éxito',
          message: 'Préstamo agregado exitosamente',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: 'Error',
          message: 'Préstamo no agregado',
          type: 'error',
          duration: 2000
        })
      }
      this.showInfoPrestamo = false
    },
    formatoMonto(val) {
      return 'S/. ' + val
    },
    formatoPlazo(val) {
      return val + ' meses'
    },
    handleUpload() {
      this.$router.push({ name: '/carga-masiva', params: { table: 'Préstamos' }})
    },
    async getLeads() {
      const leads = await consultLoanLeadsByClient(this.cliente.documentNumber)
      if (leads.length === 0) {
        this.$notify({
          title: 'Error',
          message: 'El cliente no tiene leads de préstamo disponibles',
          type: 'error',
          duration: 2000
        })
        return
      } else {
        this.lead = leads[0]
        this.cuentasCliente = await getCuentasCliente(this.cliente.documentNumber)
        if (this.cuentasCliente.length === 0) {
          this.$notify({
            title: 'Error',
            message: 'El cliente no tiene cuentas disponibles. Abrir una cuenta para continuar',
            type: 'error',
            duration: 2000
          })
          return
        }
        this.TEA = leads[0].TEA + ' %'
        this.showInfoPrestamo = true
        this.loan.loanLeadID = leads[0].loanLeanID
      }
    },
    async handleBusqueda() {
      if ((!Number(this.cliente.documentNumber)) || this.cliente.documentNumber.length !== 8) {
        this.$notify({
          title: 'Error',
          message: 'Número de documento no válido',
          type: 'error',
          duration: 2000
        })
        return
      }
      const isCliente = await consultClienteByDNI(this.cliente.documentNumber)
      if (isCliente === false) {
        this.$notify({
          title: 'Error',
          message: 'Persona no es un cliente',
          type: 'error',
          duration: 2000
        })
        this.cliente.documentNumber = ''
        return
      }
      const datosCliente = await searchCliente(this.cliente.documentNumber)
      this.cliente.name = datosCliente.personalInfo.names + ' ' + datosCliente.personalInfo.firstLastName + ' ' + datosCliente.personalInfo.secondLastName
      this.loan.clientID = datosCliente.personalInfo.clientID
      await this.getLeads()
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
