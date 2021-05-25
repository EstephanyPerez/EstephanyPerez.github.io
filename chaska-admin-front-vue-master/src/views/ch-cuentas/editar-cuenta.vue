<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px; font-size: x-large">
      Editar cuenta
    </div>
    <el-form ref="FormCuenta" :model="cuenta" :rules="rules" class="form-container">
      <fieldset>
        <legend>Información del cliente</legend>
        <div class="crearCuenta-main-container">
          <el-row style="padding-left: 15%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="5">
                    <el-select v-model="cuenta.documentName" placeholder="Tipo de documento" label="Tipo de documento" clearable style="width: 100%" class="filter-item" disabled="true">
                      <el-option v-for="item in TiposDoc" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label-width="25%" label="Número" class="FormCuenta-container-item">
                      <el-input v-model="cuenta.dni" placeholder="Número de Documento" style="width: 92%;" class="filter-item" disabled="true" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Nombres" class="FormCuenta-container-item">
              <el-input v-model="names" placeholder="Nombres" style="width: 60%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Apellido paterno" class="FormCuenta-container-item">
              <el-input v-model="firstLastName" placeholder="Apellido paterno" style="width: 60%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label-width="15%" label="Apellido materno" class="FormCuenta-container-item">
              <el-input v-model="secondLastName" placeholder="Apellido materno" style="width: 60%;" class="filter-item" disabled="true" />
            </el-form-item>
          </el-row>
        </div>
      </fieldset>
      <fieldset>
        <legend>Información de la cuenta</legend>
        <div class="crearCuenta-main-container">
          <el-row style="padding-left: 0%;">
            <el-col :span="24">
              <div class="nuevaInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label-width="30%" label="Número de cuenta" class="FormCuenta-container-item">
                      <el-input v-model="cuenta.accountNumber" placeholder="Número de cuenta" style="width: 90%;" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="15%" label="CCI" class="FormCuenta-container-item">
                      <el-input v-model="cuenta.CCI" placeholder="CCI" style="width: 90%;" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11" style="padding-left: 30%;">
                    <el-select v-model="cuenta.currency" placeholder="Moneda" label="Moneda" clearable style="width: 80%" class="filter-item">
                      <el-option v-for="item in TiposMoneda" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label-width="10%" label="Saldo" class="FormCuenta-container-item">
                      <el-input v-model="cuenta.balace" placeholder="Saldo" style="width: 90%;" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="padding-left: 14.5%;">
                  <el-col :span="10">
                    <el-date-picker type="datetime" style="width: 300px;" format="dd/mm/yyyy" placeholder="Fecha de apertura" />
                  </el-col>
                  <el-col :span="10" style="padding-left: 1%;">
                    <el-date-picker type="datetime" style="width: 300px;" format="dd/mm/yyyy" placeholder="Fecha de caducidad" />
                  </el-col>
                </el-row>
                <br>
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
import { searchPersona } from '@/api/personas'

const formatoCuenta = {
  dni: undefined,
  accountNumber: '',
  balace: '',
  type: '',
  currency: '',
  openDate: '',
  closeDate: '',
  Active: '',
  CCI: ''
}

export default {
  name: 'EditarCuenta',
  filters: {
    moment(date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  props: {
    account: {
      type: Object,
      default: formatoCuenta
    }
  },
  data() {
    return {
      TiposDoc: ['DNI', 'Carnet de extranjería'],
      TiposMoneda: ['Soles', 'Dólares'],
      cuenta: Object.assign({}, formatoCuenta),
      names: '',
      firstLastName: '',
      secondLastName: ''
    }
  },
  async mounted() {
    if (this.account.dni !== undefined) {
      this.cuenta = this.account
      const datos = await searchPersona(this.cuenta.dni)
      this.names = datos.names
      this.firstLastName = datos.firstLastName
      this.secondLastName = datos.secondLastName
    } else {
      this.$notify({
        title: 'Error',
        message: 'No se ha seleccionado una cuenta a editar',
        type: 'warning',
        duration: 2000
      })
    }
  },
  created() {
  },
  methods: {
    handleBusqueda() {
      // AQUI VA LA API DE DEFINIR SI ES CLIENTE, LISTA NEGRA O NINGUNA
      this.$notify({
        title: 'Error',
        message: 'Persona no encontrada',
        type: 'warning',
        duration: 2000
      })
    },
    handleCancelar() {
      this.$router.push('/cuentas/cuentas-simples')
    },
    handleAgregar() {
      // API DE AGREGAR CUENTA
      this.$notify({
        title: 'Exito',
        message: 'Cuenta añadida exitosamente',
        type: 'success',
        duration: 2000
      })
      this.$router.push('/cuentas/cuentas-simples')
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
      .FormCuenta-container-item {
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
