import axios from 'axios'

export function createLead(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/LoanLead/insertLoanLead', data)
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function getAllLeadTypes() {
  return axios.get(' http://servicioschaska.inf.pucp.edu.pe/LoanLead/getLeadTypes')
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getAllCurrencyTypes() {
  return axios.get(' http://servicioschaska.inf.pucp.edu.pe/Others/getCurrencyTypes')
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}
