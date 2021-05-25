<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Ver cliente potencial
    </div>
    <el-form ref="FormCliente" :model="cliente" :rules="rules" class="form-container">
      <fieldset>
        <legend>Información personal</legend>
        <div class="crearCliente-main-container">
          <el-row>
            <el-form-item label-width="18%" label="Número de documento" class="formCliente-container-item">
              <el-input v-model="cliente.documentNumber" placeholder="Número de Documento" style="width: 60%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="18%" label="Nombres" class="formCliente-container-item">
              <el-input v-model="cliente.names" placeholder="Nombres" style="width: 60%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="18%" label="Apellido paterno" class="formCliente-container-item">
              <el-input v-model="cliente.firstLastName" placeholder="Apellido paterno" style="width: 60%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="18%" label="Apellido materno" class="formCliente-container-item">
              <el-input v-model="cliente.secondLastName" placeholder="Apellido materno" style="width: 60%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
        </div>
      </fieldset>
      <fieldset>
        <legend>Dirección</legend>
        <div class="crearCliente-main-container">
          <el-row style="padding-left: 3%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Distrito" class="formCliente-container-item">
                      <el-input v-model="cliente.firstdistrict" placeholder="Distrito" style="width: 80%;" class="filter-item" disabled="true" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Dirección" class="formCliente-container-item">
                      <el-input v-model="cliente.firstAddress" placeholder="Dirección principal" style="width: 80%;" class="filter-item" disabled="true" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

        </div>
      </fieldset>
      <fieldset>
        <legend>Correo</legend>
        <div class="crearCliente-main-container">
          <el-row>
            <el-form-item label-width="15%" label="Correo principal" class="formCliente-container-item">
              <el-input v-model="cliente.firstEmail" placeholder="Correo principal" style="width: 70%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
        </div>
      </fieldset>
      <fieldset>
        <legend>Teléfono</legend>
        <div class="crearCliente-main-container">
          <el-row style="padding-left: 3%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Operador" class="formCliente-container-item">
                      <el-input v-model="cliente.firstOperator" placeholder="Operador" style="width: 80%;" class="filter-item" disabled="true" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Tel. Principal" class="formCliente-container-item">
                      <el-input v-model="cliente.firstPhone" placeholder="Télefono principal" style="width: 80%;" class="filter-item" disabled="true" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

        </div>
      </fieldset>

    </el-form>
    <br>

    <div class="crearCliente-main-container">
      <el-row style="padding-left: 3%;">
        <el-col :span="24">
          <div class="nuevaInfo-container">
            <el-row>
              <el-col :span="4">
                <el-button class="boton-continuar" style="margin-left: 10%;" type="info" icon="el-icon-close" @click="handleCancelar()">
                  Regresar
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import { searchClientePotencial } from '@/api/clientes'
import { getAllDepartments, getAllProvincesByDepartment, getAllDistrictsByProvince } from '@/api/locales'

const formatoCliente = {
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
  firstPhone: '',
  firstOperator: '',
  firstAddress: '',
  firstdepartment: '',
  firstprovince: '',
  firstdistrict: ''
}

export default {
  name: 'VerCliente',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  props: {
    client: {
      type: Object,
      default: formatoCliente
    },
    clientDNI: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      TiposDoc: ['DNI', 'Carnet de extranjería'],
      FirstProvinces: [],
      FirstDistricts: [],
      SecondProvinces: [],
      SecondDistricts: [],
      Distritos: [],
      Operadores: ['Movistar', 'Bitel', 'Claro', 'Entel', 'Tuenti'],
      cliente: Object.assign({}, formatoCliente),
      busqueda: {
        documentNumber: '',
        names: '',
        lastNames: '',
        startDate: '',
        endDate: '',
        registerNumber: '',
        isClient: ''
      }
    }
  },
  async mounted() {
    if (this.clientDNI !== '') {
      this.cliente = this.client
      console.log(this.clientDNI)
      const datos = await searchClientePotencial(this.clientDNI)
      console.log(datos)
      this.cliente.clientID = datos.id
      this.cliente.firstAddress = datos.contactInfo.address
      // this.cliente.firstdepartment = datos.
      // this.cliente.firstprovince = datos.
      this.cliente.firstdistrict = datos.contactInfo.nameDistrict
      this.fillFirstProvincias()
      this.fillFirstDistritos()
      this.cliente.firstPhone = datos.contactInfo.mobileNumber
      this.cliente.firstOperator = datos.contactInfo.operator
      this.cliente.firstEmail = datos.contactInfo.email
      // cosas que no se repiten
      this.cliente.documentName = datos.documentName
      this.cliente.documentNumber = datos.documentNumber
      this.cliente.names = datos.names
      this.cliente.firstLastName = datos.firstLastName
      console.log(datos.firstLastName, datos.secondLastName)
      this.cliente.secondLastName = datos.secondLastName
    } else {
      this.$notify({
        title: 'Error',
        message: 'No se ha seleccionado un cliente potencial',
        type: 'warning',
        duration: 2000
      })
    }
  },
  async created() {
    this.Departamentos = await getAllDepartments()
  },
  methods: {
    async fillFirstProvincias() {
      this.FirstProvinces = await getAllProvincesByDepartment(this.cliente.firstdepartment)
    },
    async fillFirstDistritos() {
      this.FirstDistricts = await getAllDistrictsByProvince(this.cliente.firstprovince)
    },
    handleCancelar() {
      this.$router.push('/clientes/clientes-potenciales')
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
