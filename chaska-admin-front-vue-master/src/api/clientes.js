import axios from 'axios'

export function loadSpecialClients(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SpecialClient/bulkLoadOfSpecialClients', data)
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getAllClientes() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Client/showAllClients')
    .then(response => {
      return response.data.clients
    }).catch(e => {
      console.log(e)
    })
}

export function busquedaClientes(data) {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Client/showAllClients', {
    params: {
      documentNumber: data.documentNumber,
      names: data.names,
      lastNames: data.lastNames,
      state: data.state,
      startDate: data.startDate,
      endDate: data.endDate
    }
  }).then(response => {
    return response.data.clients
  }).catch(e => {
    console.log(e)
  })
}

export function busquedaClientesPotenciales(data) {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/PotentialClient/showAllPotentialClients', {
    params: {
      documentNumber: data.documentNumber,
      names: data.names,
      lastNames: data.lastNames,
      startDate: data.startDate,
      endDate: data.endDate,
      registerNumber: data.registerNumber,
      isClient: data.isClient
    }
  }).then(response => {
    return response.data.potentialClients
  }).catch(e => {
    console.log(e)
  })
}

export function searchClientePotencial(_dni) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/PotentialClient/searchPotentialClient', { dni: _dni, user: 'Administrados' })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function busquedaClientesEspeciales(data) {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/SpecialClient/showAllSpecialClients', {
    params: {
      documentNumber: data.documentNumber,
      names: data.names,
      lastNames: data.lastNames,
      birthday: data.birthday,
      startDate: data.startDate,
      endDate: data.endDate
    }
  }).then(response => {
    return response.data.specialClients
  }).catch(e => {
    console.log(e)
  })
}

export function getAllClientesEspeciales() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/SpecialClient/showAllSpecialClients')
    .then(response => {
      return response.data.specialClients
    }).catch(e => {
      console.log(e)
    })
}

export function consultListaNegraByDNI(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SpecialClient/consultByID', { dni: _id })
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function consultClienteByDNI(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Client/consultByID', { dni: _id })
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function createClientByAdmin(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Client/createClientByAdmin', data)
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function deactivateCliente(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Client/deactivateClient', { clientID: _id })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function searchCliente(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Client/searchClient', { dni: _id })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function updateCliente(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Client/updateClientByAdmin', data)
    .then(response => {
      return response
    }).catch(e => {
      console.log(e)
    })
}
