import axios from 'axios'

export function loadAccounts(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/bulkLoadOfSavingsAccounts', data)
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getAllCuentas() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/queryAllAccounts')
    .then(response => {
      return response.data.accounts
    }).catch(e => {
      console.log(e)
    })
}

export function busquedaCuentas(data) {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/queryAllAccounts', {
    params: {
      documentNumber: data.documentNumber,
      names: data.names,
      lastNames: data.lastNames,
      startDate: data.startDate,
      endDate: data.endDate,
      startBalance: data.startBalance,
      endBalance: data.endBalance,
      state: data.state
    }
  }).then(response => {
    return response.data.accounts
  }).catch(e => {
    console.log(e)
  })
}

export function deactivateCuenta(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/deactivateAccount', { account: _id })
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function consultAccountsNumber(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/consultAccountsNumber', { client: _id })
    .then(response => {
      return response.data.accounts
    }).catch(e => {
      console.log(e)
    })
}

export function openAccount(_id, _id_local, _accountType) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/openAccount', { client: _id, local: _id_local, accountType: _accountType, currencyType: 'SOL' })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getCuentasCliente(_dni) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/consultSavingsAccountsByClient', { dni: _dni })
    .then(response => {
      return response.data.savingsAccounts
    }).catch(e => {
      console.log(e)
    })
}

export function getTypeAccount() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/getSavingsAccountTypes')
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}
