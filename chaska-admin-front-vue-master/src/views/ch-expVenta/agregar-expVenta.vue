<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Agregar expediente de venta
    </div>
    <el-form ref="FormExpVenta" :model="cliente" :rules="rules" class="form-container">
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
      <fieldset>
        <legend>Información del expediente de venta</legend>
        <div class="crearCliente-main-container">
          <el-row style="padding-left: 3%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item>
                      <el-date-picker v-model="expVenta.date" type="date" style="width: 90%;" format="dd-MM-yyyy" placeholder="Fecha de registro" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item>
                      <el-select v-model="expVenta.product" placeholder="Producto" label="Producto" clearable style="width: 90%" class="filter-item" @change="fillFirstDistritos()">
                        <el-option v-for="item in Productos" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item>
                      <el-select v-model="expVenta.state" placeholder="Estado" label="Estado" clearable style="width: 90%" class="filter-item">
                        <el-option v-for="item in Estados" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
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
    </el-form>
    <br>
  </div>
</template>

<script>

import moment from 'moment'

import { insertExpVentas } from '@/api/expVenta'
import { consultPersonByDNI } from '@/api/personas'
import { consultListaNegraByDNI, consultClienteByDNI, searchCliente } from '@/api/clientes'
export default {
  name: 'AgregarCliente',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  data() {
    return {
      TiposDoc: ['DNI', 'Carnet de extranjería'],
      Productos: [],
      Estados: [{ id: 0, name: 'Pendiente' }, { id: 1, name: 'Aceptado' }, { id: 2, name: 'Rechazado' }],
      expVenta: {
        client: 0,
        date: '',
        product: '',
        state: null
      },
      cliente: {
        names: '',
        firstLastName: '',
        secondLastName: '',
        documentName: '',
        documentNumber: ''
      },
      rules: {
        dni: [
          { min: 8, max: 8, message: 'DNI de 8 dígitos numéricos', trigger: 'change' }
        ]
      }
    }
  },
  async created() {
    this.Productos = []
  },
  methods: {
    async handleBusqueda() {
      if (!Number(this.cliente.documentNumber)) {
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
        this.Productos.push('Cuenta de Ahorros')
        this.Productos.push('Préstamo')
        this.$notify({
          title: 'Éxito',
          message: 'Persona encontrada',
          type: 'success',
          duration: 2000
        })
        const datosCliente = await searchCliente(this.cliente.documentNumber)
        this.expVenta.client = datosCliente.personalInfo.clientID
        this.cliente.names = datosCliente.personalInfo.names
        this.cliente.firstLastName = datosCliente.personalInfo.firstLastName
        this.cliente.secondLastName = datosCliente.personalInfo.secondLastName
      } else {
        this.$notify({
          title: 'Error',
          message: 'No es cliente. Agregarlo como tal.',
          type: 'error',
          duration: 2000
        })
      }
    },
    handleCancelar() {
      this.$router.push('/expVenta')
    },
    async handleAgregar() {
      // API DE AGREGAR CLIENTE
      // const datosCliente = JSON.stringify(this.clienteAdmin)
      const exitoAgregado = await insertExpVentas(this.expVenta)
      this.expVenta.date = moment(String(this.expVenta.date)).format('YYYY-MM-DD')
      if (exitoAgregado === true) {
        this.$notify({
          title: 'Exito',
          message: 'Expediente de Venta añadido exitosamente',
          type: 'success',
          duration: 2000
        })
        this.$router.push('/expVenta')
      } else {
        this.$notify({
          title: 'Error',
          message: 'Expediente de venta no añadido',
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
