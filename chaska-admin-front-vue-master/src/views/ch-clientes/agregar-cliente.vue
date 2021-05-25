<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Agregar cliente
    </div>
    <el-form ref="FormCliente" :model="cliente" class="form-container">
      <fieldset>
        <legend>Documento de identidad</legend>
        <div class="crearCliente-main-container">
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
                    <el-form-item
                      label-width="18%"
                      label="Número"
                      prop="documentNumber"
                      class="formCliente-container-item"
                    >
                      <el-input v-model="cliente.documentNumber" placeholder="Número de Documento" minlength="8" maxlength="8" style="width: 100%;" class="filter-item" />
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

        </div>
      </fieldset>
      <fieldset>
        <legend>Información personal</legend>
        <div class="crearCliente-main-container">
          <el-row>
            <el-form-item label-width="15%" label="Nombres" class="formCliente-container-item">
              <el-input v-model="cliente.names" placeholder="Nombres" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Apellido paterno" class="formCliente-container-item">
              <el-input v-model="cliente.firstLastName" placeholder="Apellido paterno" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Apellido materno" class="formCliente-container-item">
              <el-input v-model="cliente.secondLastName" placeholder="Apellido materno" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
        </div>
      </fieldset>
      <el-collapse-transition>
        <div v-show="showInfoPrestamo">
          <fieldset>
            <legend>Direcciones</legend>
            <div class="crearCliente-main-container">
              <el-row style="padding-left: 3%;">
                <el-col :span="24">
                  <div class="nuevaInfo-container">
                    <el-row>
                      <el-col :span="4">
                        <el-form-item prop="departamentoPrincipal">
                          <el-select v-model="cliente.firstdepartmentID" placeholder="Departamento" label="Departamentos" clearable style="width: 90%" class="filter-item" @change="fillFirstProvincias()">
                            <el-option v-for="item in Departamentos" :key="item.id" :label="item.name" :value="item.id" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item prop="provinciaPrincipal">
                          <el-select v-model="cliente.firstprovinceID" placeholder="Provincia" label="Provincia" clearable style="width: 90%" class="filter-item" @change="fillFirstDistritos()">
                            <el-option v-for="item in FirstProvinces" :key="item.id" :label="item.name" :value="item.id" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item prop="distritoPrincipal">
                          <el-select v-model="clienteAdmin.addresses[0].districtID" placeholder="Distrito" label="Distrito" clearable style="width: 90%" class="filter-item">
                            <el-option v-for="item in FirstDistricts" :key="item.id" :label="item.name" :value="item.id" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label-width="21%" label="Dir. Principal" prop="direccionPrincipal" class="formCliente-container-item">
                          <el-input v-model="clienteAdmin.addresses[0].address" placeholder="Dirección principal" style="width: 80%;" class="filter-item" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <br>
                    <el-row>
                      <el-col :span="4">
                        <el-select v-model="cliente.seconddepartmentID" placeholder="Departamento" label="Departamento" clearable style="width: 90%" class="filter-item" @change="fillSecondProvincias()">
                          <el-option v-for="item in Departamentos" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                      </el-col>
                      <el-col :span="4">
                        <el-select v-model="cliente.secondprovinceID" placeholder="Provincia" label="Provincia" clearable style="width: 90%" class="filter-item" @change="fillSecondDistritos()">
                          <el-option v-for="item in SecondProvinces" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                      </el-col>
                      <el-col :span="4">
                        <el-select v-model="clienteAdmin.addresses[1].districtID" placeholder="Distrito" label="Distrito" clearable style="width: 90%" class="filter-item">
                          <el-option v-for="item in SecondDistricts" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label-width="21%" label="Dir. Secundaria" class="formCliente-container-item">
                          <el-input v-model="clienteAdmin.addresses[1].address" placeholder="Dirección secundaria" style="width: 80%;" class="filter-item" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>

            </div>
          </fieldset>
          <fieldset>
            <legend>Correos</legend>
            <div class="crearCliente-main-container">
              <el-row>
                <el-form-item label-width="15%" label="Correo principal" prop="correoPrincipal" class="formCliente-container-item">
                  <el-input v-model="clienteAdmin.emails[0].email" placeholder="Correo principal" style="width: 70%;" class="filter-item" />
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label-width="15%" label="Correo secundario" class="formCliente-container-item">
                  <el-input v-model="clienteAdmin.emails[1].email" placeholder="Correo secundario" style="width: 70%;" class="filter-item" />
                </el-form-item>
              </el-row>
            </div>
          </fieldset>
          <fieldset>
            <legend>Teléfonos</legend>
            <div class="crearCliente-main-container">
              <el-row style="padding-left: 3%;">
                <el-col :span="24">
                  <div class="nuevaInfo-container">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item prop="operador">
                          <el-select v-model="clienteAdmin.cellphones[0].operator" placeholder="Operador" label="Operador" clearable style="width: 90%" class="filter-item">
                            <el-option v-for="item in Operadores" :key="item" :label="item" :value="item" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label-width="21%" prop="telefonoPrincipal" label="Tel. Principal" class="formCliente-container-item">
                          <el-input v-model="clienteAdmin.cellphones[0].number" placeholder="Télefono principal" style="width: 80%;" class="filter-item" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-select v-model="clienteAdmin.cellphones[1].operator" placeholder="Operador" label="Operador" clearable style="width: 90%" class="filter-item">
                          <el-option v-for="item in Operadores" :key="item" :label="item" :value="item" />
                        </el-select>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label-width="21%" label="Tel. Secundario" class="formCliente-container-item">
                          <el-input v-model="clienteAdmin.cellphones[1].number" placeholder="Télefono secundario" style="width: 80%;" class="filter-item" />
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
    <br>
  </div>
</template>

<script>

import moment from 'moment'

import { getAllDepartments, getAllProvincesByDepartment, getAllDistrictsByProvince } from '@/api/locales'
import { consultPersonByDNI, searchPersona } from '@/api/personas'
import { consultListaNegraByDNI, consultClienteByDNI, createClientByAdmin } from '@/api/clientes'
export default {
  name: 'AgregarCliente',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  data() {
    return {
      showInfoPrestamo: false,
      TiposDoc: ['DNI', 'Carnet de extranjería'],
      Departamentos: [],
      FirstProvinces: [],
      FirstDistricts: [],
      SecondProvinces: [],
      SecondDistricts: [],
      Operadores: ['Movistar', 'Bitel', 'Claro', 'Entel', 'Otro'],
      cliente: {
        names: '',
        firstLastName: '',
        secondLastName: '',
        documentName: '',
        documentNumber: '',
        firstdepartmentID: '',
        firstprovinceID: '',
        seconddepartmentID: '',
        secondprovinceID: '',
        firstdistrictID: '',
        seconddistrictID: ''
      },
      clienteAdmin: {
        dni: '',
        addresses: [
          {
            type: 'Principal',
            address: '',
            districtID: null
          },
          {
            type: 'Secundario',
            address: '',
            districtID: null
          }
        ],
        emails: [
          {
            type: 'Principal',
            email: ''
          },
          {
            type: 'Secundario',
            email: ''
          }
        ],
        cellphones: [
          {
            type: 'Principal',
            number: '',
            operator: null
          },
          {
            type: 'Secundario',
            number: '',
            operator: null
          }
        ]
      }
    }
  },
  async created() {
    this.Departamentos = await getAllDepartments()
  },
  methods: {
    async fillFirstProvincias() {
      this.FirstProvinces = await getAllProvincesByDepartment(this.cliente.firstdepartmentID)
    },
    async fillFirstDistritos() {
      this.FirstDistricts = await getAllDistrictsByProvince(this.cliente.firstprovinceID)
    },
    async fillSecondProvincias() {
      this.SecondProvinces = await getAllProvincesByDepartment(this.cliente.seconddepartmentID)
    },
    async fillSecondDistritos() {
      this.SecondDistricts = await getAllDistrictsByProvince(this.cliente.secondprovinceID)
    },

    async handleBusqueda() {
      if (!Number(this.cliente.documentNumber) || (this.cliente.documentNumber.length !== 8)) {
        this.$notify({
          title: 'Error',
          message: 'Número de documento no válido',
          type: 'error',
          duration: 2000
        })
        return
      }
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
      const isCliente = await consultClienteByDNI(this.cliente.documentNumber)
      if (isCliente === true) {
        this.$notify({
          title: 'Error',
          message: 'Persona ya es un cliente',
          type: 'error',
          duration: 2000
        })
        this.cliente.documentNumber = ''
        return
      }
      this.$notify({
        title: 'Éxito',
        message: 'Persona encontrada',
        type: 'success',
        duration: 2000
      })
      const datosCliente = await searchPersona(this.cliente.documentNumber)
      this.cliente.names = datosCliente.names
      this.cliente.firstLastName = datosCliente.firstLastName
      this.cliente.secondLastName = datosCliente.secondLastName
      this.clienteAdmin.dni = this.cliente.documentNumber
      this.showInfoPrestamo = true
    },
    handleCancelar() {
      this.$router.push('/clientes/clientes-regulares')
    },
    validarLongitud(cadena) {
      return (cadena.length !== 0)
    },
    isValidEmail() {
      return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.clienteAdmin.emails[0].email) && (/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.clienteAdmin.emails[1].email) || this.clienteAdmin.emails[1].email.length === 0)
    },
    isValidPhone() {
      var phone1 = false
      var phone2 = false
      if (this.clienteAdmin.cellphones[0].number.length > 0) {
        phone1 = /^([0-9])*$/.test(this.clienteAdmin.cellphones[0].number)
      }
      if (this.clienteAdmin.cellphones[1].number.length === 0) {
        phone2 = true
      } else if (this.clienteAdmin.cellphones[1].number.length === 7 || this.clienteAdmin.cellphones[1].number.length === 9) {
        phone2 = /^([0-9])*$/.test(this.clienteAdmin.cellphones[1].number)
      }
      return phone1 && phone2
    },
    validarCliente() {
      const valDireccion = this.validarLongitud(this.clienteAdmin.addresses[0].address)
      const valEmail = this.isValidEmail()
      const valTelefono = this.isValidPhone()
      if (!valDireccion) {
        this.$message({
          message: 'Por favor ingrese una dirección válida',
          type: 'warning'
        })
      }
      if (!valEmail) {
        this.$message({
          message: 'Por favor ingrese un correo válido',
          type: 'warning'
        })
      }
      if (!valTelefono) {
        this.$message({
          message: 'Por favor ingrese un teléfono válido',
          type: 'warning'
        })
      }
      return (valDireccion && valEmail && valTelefono)
    },
    async handleAgregar() {
      const valido = this.validarCliente()
      if (!valido) {
        return
      }
      const exitoAgregado = await createClientByAdmin(this.clienteAdmin)
      if (exitoAgregado === true) {
        this.$notify({
          title: 'Exito',
          message: 'Cliente añadido exitosamente',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: 'Error',
          message: 'Persona no añadida como cliente',
          type: 'error',
          duration: 2000
        })
      }
      this.showInfoPrestamo = false
      this.cliente = {
        names: '',
        firstLastName: '',
        secondLastName: '',
        documentName: '',
        documentNumber: '',
        firstdepartmentID: '',
        firstprovinceID: '',
        seconddepartmentID: '',
        secondprovinceID: '',
        firstdistrictID: '',
        seconddistrictID: ''
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
