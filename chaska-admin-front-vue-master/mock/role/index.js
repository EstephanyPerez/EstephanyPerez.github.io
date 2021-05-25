import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'Administrador',
    description: 'Super Administrador. Tiene acceso a todas las páginas.',
    routes: routes
  },
  {
    key: 'gestorClientes',
    name: 'Gestor de clientes',
    description: 'Tiene acceso a la administración de los clientes.',
    routes: routes
  },
  {
    key: 'gestorCuentas',
    name: 'Gestor de cuentas',
    description: 'Tiene acceso a la administración de las cuentas.',
    routes: routes
  },
  {
    key: 'gestorPrestamos',
    name: 'Gestor de préstamos',
    description: 'Tiene acceso a la administración de los préstamos.',
    routes: routes
  }
]

export default [
  // mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
