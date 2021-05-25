import axios from 'axios'

export function getReportClients() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Report/getReportClients')
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getReportAccounts() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Report/getReportSavingAccounts')
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getReportLeads() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Report/getReportLeads')
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}
