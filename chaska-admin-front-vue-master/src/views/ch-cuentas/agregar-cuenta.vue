<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Nueva cuenta
    </div>
    <el-form ref="FormCuenta" class="form-container">
      <fieldset>
        <legend>Información del cliente</legend>
        <div class="crearCuenta-main-container">
          <el-row style="padding-left: 3%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="6">
                    <el-select v-model="cliente.documentName" placeholder="Tipo de documento" label="Tipo de documento" clearable style="width: 100%" class="filter-item">
                      <el-option v-for="item in TiposDoc" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label-width="18%" label="Número" class="formCuenta-container-item">
                      <el-input v-model="cliente.documentNumber" placeholder="Número de Documento" style="width: 100%;" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-button class="boton-continuar" style="margin-left: 10%;" type="primary" icon="el-icon-search" @click="handleBusqueda()">
                      Buscar
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Nombres" class="formCuenta-container-item">
              <el-input v-model="cliente.names" placeholder="Nombres" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Apellido paterno" class="formCuenta-container-item">
              <el-input v-model="cliente.firstLastName" placeholder="Apellido paterno" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Apellido materno" class="formCuenta-container-item">
              <el-input v-model="cliente.secondLastName" placeholder="Apellido materno" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
        </div>
      </fieldset>
      <fieldset>
        <legend>Agregar Local</legend>
        <div class="crearCuenta-main-container">
          <el-row style="padding-left: 3%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="4">
                    <el-select v-model="cliente.firstdepartmentID" placeholder="Departamento" label="Departamentos" clearable style="width: 90%" class="filter-item" @change="fillFirstProvincias()">
                      <el-option v-for="item in Departamentos" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="cliente.firstprovinceID" placeholder="Provincia" label="Provincia" clearable style="width: 90%" class="filter-item" @change="fillFirstDistritos()">
                      <el-option v-for="item in FirstProvinces" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="cliente.firstdistrictID" placeholder="Distrito" label="Distrito" clearable style="width: 90%" class="filter-item" @change="fillFirstLocal()">
                      <el-option v-for="item in FirstDistricts" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="localID" placeholder="Local" label="Local" clearable style="width: 90%" class="filter-item">
                      <el-option v-for="item in FirstLocal" :key="item.id" :label="item.address" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="accountType" placeholder="Tipo de Cuenta" label="Tipo de Cuenta" clearable style="width: 90%" class="filter-item">
                      <el-option v-for="item in TypeCuenta" :key="item.codSavingsAccountType" :label="item.nameSavingsAccountType" :value="item.codSavingsAccountType" />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

        </div>
      </fieldset>

    </el-form>
    <br>

    <div class="crearCuenta-main-container">
      <el-row style="padding-left: 3%;">
        <el-col :span="24">
          <div class="nuevaInfo-container">
            <el-row>
              <el-col :span="12">
                <el-button class="boton-continuar" style="margin-left: 60%;" type="danger" icon="el-icon-close" @click="handleCancelar()">
                  Cancelar
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button class="boton-continuar" style="margin-left: 10%;" type="success" icon="el-icon-check" @click="handleAgregar()">
                  Añadir
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

const formatoCliente = {
  clientID: undefined,
  names: '',
  firstLastName: '',
  secondLastName: '',
  documentName: '',
  documentNumber: '',
  firstdepartmentID: '',
  firstprovinceID: '',
  firstdistrictID: ''
}

import { openAccount } from '@/api/cuentas'
import { consultAccountsNumber, getTypeAccount } from '@/api/cuentas'
import { getAllDepartments, getAllProvincesByDepartment, getAllDistrictsByProvince, getAllLocalByDistrict } from '@/api/locales'
import { consultPersonByDNI, searchPersona } from '@/api/personas'
import { consultListaNegraByDNI, consultClienteByDNI, searchCliente } from '@/api/clientes'

export default {
  name: 'AgregarCuenta',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  data() {
    return {
      TiposDoc: ['DNI', 'Carnet de extranjería'],
      Departamentos: [],
      FirstProvinces: [],
      FirstDistricts: [],
      FirstLocal: [],
      TypeCuenta: [],
      cliente: Object.assign({}, formatoCliente),
      localID: null,
      accountType: null
    }
  },
  async created() {
    this.Departamentos = await getAllDepartments()
    this.TypeCuenta = await getTypeAccount()
  },
  methods: {
    handleUpload() {
      this.$router.push({ name: '/carga-masiva', params: { table: 'Cuentas' }})
    },
    async fillFirstProvincias() {
      this.FirstProvinces = await getAllProvincesByDepartment(this.cliente.firstdepartmentID)
    },
    async fillFirstDistritos() {
      this.FirstDistricts = await getAllDistrictsByProvince(this.cliente.firstprovinceID)
    },
    async fillFirstLocal() {
      const data = await getAllLocalByDistrict(this.cliente.firstdistrictID)
      this.FirstLocal = data.nearLocals
    },
    async checkifCliente() {
      const isCliente = true // await getIsCliente(this.cliente.documentNumber)
      return isCliente
    },
    async checkifClienteEspecial() {
      const isClienteEspecial = true // await getIsClienteEspecial(this.cliente.documentNumber)
      return isClienteEspecial
    },
    async handleBusqueda() {
      // AQUI VA LA API DE DEFINIR SI ES CLIENTE, LISTA NEGRA O NINGUNA
      const isPerson = await consultPersonByDNI(this.cliente.documentNumber)
      if (isPerson === false) {
        this.$notify({
          title: 'Error',
          message: 'Persona no encontrada',
          type: 'error',
          duration: 2000
        })
        this.cliente.documentNumber = ''
        return
      }
      const isListaNegra = await consultListaNegraByDNI(this.cliente.documentNumber)
      if (isListaNegra === true) {
        this.$notify({
          title: 'Error',
          message: 'Persona en lista negra',
          type: 'error',
          duration: 2000
        })
        this.cliente.documentNumber = ''
        return
      }
      const cantidadCuentas = await consultAccountsNumber(this.cliente.documentNumber)
      if (cantidadCuentas > 4) {
        this.$notify({
          title: 'Error',
          message: 'Persona alcanzó el máximo número de cuentas',
          type: 'error',
          duration: 2000
        })
        this.cliente.documentNumber = ''
        return
      }

      const isCliente = await consultClienteByDNI(this.cliente.documentNumber)
      if (isCliente === true) {
        this.$notify({
          title: 'Éxito',
          message: 'Persona encontrada',
          type: 'success',
          duration: 2000
        })
      }
      const datosCliente = await searchPersona(this.cliente.documentNumber)
      this.cliente.names = datosCliente.names
      this.cliente.firstLastName = datosCliente.firstLastName
      this.cliente.secondLastName = datosCliente.secondLastName

      // cliente.names, cliente.firstLastName, cliente.secondLastName
      // llenar las cosas aqui
    },
    handleCancelar() {
      this.$router.push('/cuentas')
    },
    async handleAgregar() {
      const datos = await searchCliente(this.cliente.documentNumber)
      const cuenta = await openAccount(datos.personalInfo.clientID, this.localID, this.accountType)
      if (cuenta.idAccount.Length !== 0) {
        this.$notify({
          title: 'Exito',
          message: 'Cuenta añadida exitosamente',
          type: 'success',
          duration: 2000
        })
        this.$router.push('/cuentas')
      } else {
        this.$notify({
          title: 'Error',
          message: 'Cuenta no añadida',
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

.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.crearCuenta-container {
  position: relative;
  .crearCuenta-main-container {
    padding: 40px 45px 20px 50px;
    .nuevaInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .formCuenta-container-item {
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
