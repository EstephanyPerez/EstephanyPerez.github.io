<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Nuevo lead para campaña {{ idCampaign }}
    </div>
    <el-form ref="FormLead" :model="prestamo" class="form-container">
      <fieldset>
        <legend>Cliente</legend>
        <div class="crearLead-main-container" style="margin-top: 15px;">
          <el-row style="padding-left: 1%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label-width="35%" width="60%" label="Número de documento" class="formCliente-container-item">
                      <el-input v-model="cliente.documentNumber" style="width: 90%;" placeholder="Número">
                        <el-select slot="prepend" width="210px" placeholder="Tipo">
                          <el-option label="DNI" value="1" />
                          <el-option label="Carnet de extranjería" value="2" />
                        </el-select>
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
        <div v-show="showInfoLead">
          <fieldset>
            <legend>Lead</legend>
            <div class="crearLead-main-container">
              <el-row style="padding-left: 1%;">
                <el-col :span="24">
                  <div class="nuevaInfo-container">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label-width="40%" label="Tipo de lead" class="formCliente-container-item">
                          <el-select v-model="lead.leadType" placeholder="Tipo" clearable style="width: 90%" @change="changeTipoPrestamo">
                            <el-option v-for="item in LeadTypes" :key="item.codLeadType" :label="item.nameLeadType" :value="item.codLeadType" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="40%" label="Moneda" class="formCliente-container-item">
                          <el-select v-model="lead.currency" placeholder="Moneda" clearable style="width: 90%">
                            <el-option v-for="item in CurrencyTypes" :key="item.codCurrencyType" :label="item.nameCurrencyType" :value="item.codCurrencyType" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="40%" label="TEA (%)" class="formCliente-container-item">
                          <el-input-number v-model="numTEA" style="width: 90%;" :precision="2" :step="0.01" :min="0.01" :max="100" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                        <el-form-item label-width="20%" label="Monto" class="formCliente-container-item">
                          <el-slider v-model="rangosMonto" range :min="minMontoSlider" :max="maxMontoSlider" :step="varMonto" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="40%" label="Variación" class="formCliente-container-item">
                          <el-input-number v-model="varMonto" style="width: 90%;" :min="1" :max="1000" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                        <el-form-item label-width="20%" label="Plazo (mensual)" class="formCliente-container-item">
                          <el-slider v-model="rangosPlazo" range :min="6" :max="60" :step="varPlazo" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="40%" label="Variación" class="formCliente-container-item">
                          <el-input-number v-model="varPlazo" style="width: 90%;" :min="1" :max="54" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label-width="40%" label="Periodos de gracia" class="formCliente-container-item">
                          <el-input-number v-model="periodosGracia" style="width: 90%;" :min="0" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
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
import { getAllLeadTypes, getAllCurrencyTypes, createLead } from '@/api/leads'
export default {
  name: 'AgregarLead',
  props: {
    idCampaign: {
      type: String,
      default: '3'
    }
  },
  data() {
    return {
      showInfoLead: false,
      LeadTypes: [],
      CurrencyTypes: [],
      rangosMonto: [200, 500],
      rangosPlazo: [10, 35],
      varPlazo: 1,
      varMonto: 100,
      numTEA: 15,
      minMontoSlider: 100,
      maxMontoSlider: 100000,
      periodosGracia: 1,
      prestamo: {
        id: ''
      },
      cliente: {
        documentNumber: '',
        name: ''
      },
      lead: {
        clientID: '',
        campaingID: '',
        minAmount: '',
        maxAmount: '',
        varAmount: '',
        minFees: '',
        maxFees: '',
        varFees: '',
        TEA: '',
        leadType: null,
        currency: null,
        maxGrace: ''
      }
    }
  },
  methods: {
    changeTipoPrestamo() {
      console.log(this.lead.leadType)
      if (this.lead.leadType === 'PE') {
        this.minMontoSlider = 0.01 * 210000
        this.maxMontoSlider = 210000
      }
      if (this.lead.leadType === 'PH') {
        this.minMontoSlider = Math.round(0.01 * 0.9 * 245758)
        this.maxMontoSlider = Math.round(0.9 * 245758)
      }
      if (this.lead.leadType === 'PV') {
        this.minMontoSlider = Math.round(0.01 * 101649)
        this.maxMontoSlider = 101649
      }
    },
    async handleCancelar() {
      this.$router.push('/campañas/leads')
    },
    async handleAgregar() {
      this.lead.minFees = this.rangosPlazo[0]
      this.lead.maxFees = this.rangosPlazo[1]
      this.lead.minAmount = this.rangosMonto[0]
      this.lead.maxAmount = this.rangosMonto[1]
      this.lead.varAmount = this.varMonto
      this.lead.varFees = this.varPlazo
      this.lead.TEA = this.numTEA
      this.lead.maxGrace = this.periodosGracia
      if (this.lead.leadType === null || this.lead.currency === null || this.numTEA < 0) {
        this.$notify({
          title: 'Error',
          message: 'Llenar todos los campos',
          type: 'error',
          duration: 2000
        })
        return
      }
      const result = await createLead(this.lead)
      if (result === true) {
        this.$notify({
          title: 'Éxito',
          message: 'Lead agregado exitosamente',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: 'Error',
          message: 'Lead no agregado',
          type: 'error',
          duration: 2000
        })
      }
      this.showInfoLead = false
    },
    formatoMonto(val) {
      return 'S/. ' + val
    },
    formatoPlazo(val) {
      return val + ' meses'
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
      this.lead.clientID = datosCliente.personalInfo.clientID
      this.lead.campaingID = this.idCampaign
      this.LeadTypes = await getAllLeadTypes()
      this.CurrencyTypes = await getAllCurrencyTypes()
      this.showInfoLead = true
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

.crearLead-container {
  position: relative;
  .crearLead-main-container {
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
