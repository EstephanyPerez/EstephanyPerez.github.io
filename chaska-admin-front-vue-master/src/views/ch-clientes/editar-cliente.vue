<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Editar cliente
    </div>
    <el-form ref="FormCliente" :model="cliente" class="form-container">
      <fieldset>
        <legend>Información personal</legend>
        <div class="crearCliente-main-container">
          <el-row>
            <el-form-item label-width="18%" label="Número de documento" class="formCliente-container-item">
              <el-input v-model="cliente.documentNumber" placeholder="Número de Documento" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="18%" label="Nombres" class="formCliente-container-item">
              <el-input v-model="cliente.names" placeholder="Nombres" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="18%" label="Apellido paterno" class="formCliente-container-item">
              <el-input v-model="cliente.firstLastName" placeholder="Apellido paterno" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="18%" label="Apellido materno" class="formCliente-container-item">
              <el-input v-model="cliente.secondLastName" placeholder="Apellido materno" style="width: 60%;" class="filter-item" disabled />
            </el-form-item>
          </el-row>
        </div>
      </fieldset>
      <fieldset>
        <legend>Direcciones</legend>
        <div class="crearCliente-main-container">
          <el-row style="padding-left: 3%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="4">
                    <el-select v-model="cliente.firstdepartment" placeholder="Departamento" label="Departamentos" clearable style="width: 90%" class="filter-item" @change="fillFirstProvincias()">
                      <el-option v-for="item in Departamentos" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="cliente.firstprovince" placeholder="Provincia" label="Provincia" clearable style="width: 90%" class="filter-item" @change="fillFirstDistritos()">
                      <el-option v-for="item in FirstProvinces" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="cliente.firstdistrict" placeholder="Distrito" label="Distrito" clearable style="width: 90%" class="filter-item">
                      <el-option v-for="item in FirstDistricts" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Principal" class="formCliente-container-item">
                      <el-input v-model="cliente.firstAddress" placeholder="Dirección principal" style="width: 80%;" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-select v-model="cliente.seconddepartment" placeholder="Departamento" label="Departamento" clearable style="width: 90%" class="filter-item" @change="fillSecondProvincias()">
                      <el-option v-for="item in Departamentos" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="cliente.secondprovince" placeholder="Provincia" label="Provincia" clearable style="width: 90%" class="filter-item" @change="fillSecondDistritos()">
                      <el-option v-for="item in SecondProvinces" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="cliente.seconddistrict" placeholder="Distrito" label="Distrito" clearable style="width: 90%" class="filter-item">
                      <el-option v-for="item in SecondDistricts" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Secundaria" class="formCliente-container-item">
                      <el-input v-model="cliente.secondAddress" placeholder="Dirección secundaria" style="width: 80%;" class="filter-item" />
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
            <el-form-item label-width="15%" label="Correo principal" class="formCliente-container-item">
              <el-input v-model="cliente.firstEmail" placeholder="Correo principal" style="width: 70%;" class="filter-item" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Correo secundario" class="formCliente-container-item">
              <el-input v-model="cliente.secondEmail" placeholder="Correo secundario" style="width: 70%;" class="filter-item" />
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
                    <el-select v-model="cliente.firstOperator" placeholder="Operador" label="Operador" clearable style="width: 90%" class="filter-item">
                      <el-option v-for="item in Operadores" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Tel. Principal" class="formCliente-container-item">
                      <el-input v-model="cliente.firstPhone" placeholder="Télefono principal" style="width: 80%;" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-select v-model="cliente.secondOperator" placeholder="Operador" label="Operador" clearable style="width: 90%" class="filter-item">
                      <el-option v-for="item in Operadores" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="21%" label="Tel. Secundario" class="formCliente-container-item">
                      <el-input v-model="cliente.secondPhone" placeholder="Télefono secundario" style="width: 80%;" class="filter-item" />
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
              <el-col :span="12">
                <el-button class="boton-continuar" style="margin-left: 60%;" type="danger" icon="el-icon-close" @click="handleCancelar()">
                  Cancelar
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button class="boton-continuar" style="margin-left: 10%;" type="success" icon="el-icon-check" @click="handleEditar()">
                  Actualizar
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
import { searchCliente, updateCliente } from '@/api/clientes'
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
  secondEmail: '',
  firstPhone: '',
  firstOperator: '',
  secondPhone: '',
  secondOperator: '',
  firstAddress: '',
  firstdepartment: '',
  firstprovince: '',
  firstdistrict: '',
  secondAddress: '',
  seconddepartment: '',
  secondprovince: '',
  seconddistrict: ''
}

export default {
  name: 'AgregarCliente',
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
      dataClient: {
        clientID: -1,
        addresses: [
          {
            type: 'Principal',
            address: 'default',
            districtID: 1
          },
          {
            type: 'Secundario',
            address: 'default',
            districtID: 1
          }
        ],
        emails: [
          {
            type: 'Principal',
            email: 'default'
          },
          {
            type: 'Secundario',
            email: 'default'
          }
        ],
        cellphones: [
          {
            type: 'Principal',
            number: 'default',
            operator: 'default'
          },
          {
            type: 'Secundario',
            number: 'default',
            operator: 'default'
          }
        ]
      }
    }
  },
  async mounted() {
    if (this.clientDNI !== '') {
      this.cliente = this.client
      const datos = await searchCliente(this.clientDNI)
      this.cliente.clientID = datos.personalInfo.clientID
      this.cliente.firstAddress = datos.addresses[0].address
      this.cliente.firstdepartment = datos.addresses[0].department
      this.cliente.firstprovince = datos.addresses[0].province
      this.cliente.firstdistrict = datos.addresses[0].district
      this.fillFirstProvincias()
      this.fillFirstDistritos()
      try {
        this.cliente.secondAddress = datos.addresses[1].address
        this.cliente.seconddepartment = datos.addresses[1].department
        this.cliente.secondprovince = datos.addresses[1].province
        this.cliente.seconddistrict = datos.addresses[1].district
        this.fillSecondProvincias()
        this.fillSecondDistritos()
      } catch (error) { console.error(error) }
      try {
        this.cliente.secondEmail = datos.emails[1].email
      } catch (error) { console.error(error) }
      try {
        this.cliente.secondPhone = datos.cellphones[1].number
      } catch (error) { console.error(error) }
      try {
        this.cliente.secondOperator = datos.cellphones[1].operator
      } catch (error) { console.error(error) }
      this.cliente.firstPhone = datos.cellphones[0].number
      this.cliente.firstOperator = datos.cellphones[0].operator
      this.cliente.firstEmail = datos.emails[0].email
      // cosas que no se repiten
      this.cliente.documentName = datos.personalInfo.documentType
      this.cliente.documentNumber = datos.personalInfo.documentNumber
      this.cliente.names = datos.personalInfo.names
      this.cliente.firstLastName = datos.personalInfo.firstLastName
      this.cliente.secondLastName = datos.personalInfo.secondLastName
      this.cliente.CEM = datos.personalInfo.CEM
    } else {
      this.$notify({
        title: 'Error',
        message: 'No se ha seleccionado un cliente a editar',
        type: 'warning',
        duration: 2000
      })
    }
  },
  async created() {
    this.Departamentos = await getAllDepartments()
    this.cliente.secondAddress = ''
    this.cliente.seconddepartment = null
    this.cliente.secondprovince = null
    this.cliente.seconddistrict = null
    this.cliente.secondEmail = ''
    this.cliente.secondPhone = ''
    this.cliente.secondOperator = null
  },
  methods: {
    async fillFirstProvincias() {
      this.FirstProvinces = await getAllProvincesByDepartment(this.cliente.firstdepartment)
    },
    async fillFirstDistritos() {
      this.FirstDistricts = await getAllDistrictsByProvince(this.cliente.firstprovince)
    },
    async fillSecondProvincias() {
      this.SecondProvinces = await getAllProvincesByDepartment(this.cliente.seconddepartment)
    },
    async fillSecondDistritos() {
      this.SecondDistricts = await getAllDistrictsByProvince(this.cliente.secondprovince)
    },
    handleCancelar() {
      this.$router.push('/clientes/clientes-regulares')
    },
    async handleEditar() {
      this.dataClient.clientID = this.cliente.clientID
      this.dataClient.addresses[0].address = this.cliente.firstAddress
      this.dataClient.addresses[0].districtID = this.cliente.firstdistrict
      this.dataClient.addresses[1].address = this.cliente.secondAddress
      this.dataClient.addresses[1].districtID = this.cliente.seconddistrict
      this.dataClient.emails[0].email = this.cliente.firstEmail
      this.dataClient.emails[1].email = this.cliente.secondEmail
      this.dataClient.cellphones[0].number = this.cliente.firstPhone
      this.dataClient.cellphones[0].operator = this.cliente.firstOperator
      this.dataClient.cellphones[1].number = this.cliente.secondPhone

      this.dataClient.cellphones[1].operator = this.cliente.secondOperator
      if (!this.isValidAddress()) {
        this.$notify({
          title: 'Error',
          message: 'Ingrese dirección válida',
          type: 'error',
          duration: 2000
        })
        return
      }
      if (!this.isValidEmail()) {
        this.$notify({
          title: 'Error',
          message: 'Ingrese email válido',
          type: 'error',
          duration: 2000
        })
        return
      }
      if (!this.isValidPhone()) {
        this.$notify({
          title: 'Error',
          message: 'Ingrese teléfono válido',
          type: 'error',
          duration: 2000
        })
        return
      }
      if (!this.isValidOperator()) {
        this.$notify({
          title: 'Error',
          message: 'Ingrese operador válido',
          type: 'error',
          duration: 2000
        })
        return
      }
      console.log(this.dataClient)
      const exitoEditado = await updateCliente(this.dataClient)
      if (exitoEditado) {
        this.$notify({
          title: 'Exito',
          message: 'Cliente editado exitosamente',
          type: 'success',
          duration: 2000
        })
        this.$router.push('/clientes/clientes-regulares')
      } else {
        this.$notify({
          title: 'Error',
          message: 'Fallo en la edición',
          type: 'error',
          duration: 2000
        })
      }
    },
    isValidAddress() {
      var ad1 = false
      if (this.cliente.firstdepartment !== null && this.cliente.firstprovince !== null && this.cliente.firstdistrict !== null && this.cliente.firstAddress.length > 0) {
        ad1 = true
      }
      return ad1
    },
    isValidPhone() {
      var phone1 = false
      var phone2 = false
      if (this.cliente.firstPhone.length > 0) {
        phone1 = /^([0-9])*$/.test(this.client.firstPhone)
      }
      if (this.cliente.secondPhone.length === 0) {
        phone2 = true
      } else if (this.cliente.secondPhone.length === 7 || this.cliente.secondPhone.length === 9) {
        phone2 = /^([0-9])*$/.test(this.client.secondPhone)
      }
      return phone1 && phone2
    },
    isValidOperator() {
      var op1 = false
      var op2 = false
      if (this.cliente.firstPhone.length > 0 && this.cliente.firstOperator.length > 0) {
        op1 = true
      }
      if ((this.cliente.secondPhone.length > 0 && this.cliente.secondOperator !== null) || (this.cliente.secondPhone.length === 0 && this.cliente.secondOperator === null)) {
        op2 = true
      }
      return op1 && op2
    },
    isValidEmail() {
      return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.cliente.firstEmail) && (/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.cliente.secondEmail) || this.cliente.secondEmail.length === 0)
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
