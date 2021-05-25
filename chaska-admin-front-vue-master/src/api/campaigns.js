import axios from 'axios'

export function loadCampaign(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Campaing/bulkLoadOfLeads', data)
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getAllCampaigns() {
  return axios.get(' http://servicioschaska.inf.pucp.edu.pe/Campaing/showAllCampaings')
    .then(response => {
      return response.data.campaings
    }).catch(e => {
      console.log(e)
    })
}

export function busquedaLeads(data) {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/LoanLead/consultLoanLeadsByCampaing', {
    params: {
      campaingID: data.campaingID,
      documentNumber: data.documentNumber,
      names: data.names,
      lastNames: data.lastNames,
      state: data.state
    }
  }).then(response => {
    return response.data.loanLeads
  }).catch(e => {
    console.log(e)
  })
}

export function consultLoanLeadsByCampaign(_idCampaign) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/LoanLead/consultLoanLeadsByCampaing', { campaingID: _idCampaign })
    .then(response => {
      return response.data.loanLeads
    }).catch(e => {
      console.log(e)
    })
}

export function refuseLoanLead(_loanLeadID) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/LoanLead/refuseLoanLead', { loanLeadID: _loanLeadID })
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function consultLoanLeadsByClient(_dni) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/LoanLead/consultLoanLeadsByClient', { dni: _dni })
    .then(response => {
      return response.data.loanLeads
    }).catch(e => {
      console.log(e)
    })
}
