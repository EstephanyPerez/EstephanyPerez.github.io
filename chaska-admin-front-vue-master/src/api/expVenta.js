import axios from 'axios'

export function getAllExpVentas() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/SaleFile/queryAllSaleFiles')
    .then(response => {
      return response.data.files
    }).catch(e => {
      console.log(e)
    })
}

export function busquedaExpVentas(data) {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/SaleFile/queryAllSaleFiles', {
    params: {
      documentNumber: data.documentNumber,
      names: data.names,
      lastNames: data.lastNames,
      product: data.product,
      channel: data.channel,
      startDate: data.startDate,
      endDate: data.endDate,
      state: data.state
    }
  }).then(response => {
    return response.data.files
  }).catch(e => {
    console.log(e)
  })
}

export function insertExpVentas(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SaleFile/insertPaperSaleFile', data)
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function updateExpVentasStatus(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/SaleFile/updateSaleFileStatus', data)
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}
