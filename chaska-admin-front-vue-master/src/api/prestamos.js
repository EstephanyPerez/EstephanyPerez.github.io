import axios from 'axios'

export function getAllLoans() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Loan/showAllLoans')
    .then(response => {
      return response.data.loans
    }).catch(e => {
      console.log(e)
    })
}

export function loadLoans(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Loan/bulkLoadOfLoans', data)
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function busquedaPrestamos(data) {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Loan/showAllLoans', {
    params: {
      documentNumber: data.documentNumber,
      names: data.names,
      lastNames: data.lastNames,
      startAmount: data.startAmount,
      endAmount: data.endAmount,
      startDate: data.startDate,
      endDate: data.endDate
    }
  }).then(response => {
    return response.data.loans
  }).catch(e => {
    console.log(e)
  })
}

export function grantLoan(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Loan/grantLoan', data)
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}

export function sendCalendar(_loanID) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/LoanDetail/sendCalendar', { loanID: _loanID })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getCuota(diaActual, monto, plazo) {
  // const rate = (Math.pow((1+this.state.annualEfectiveRate/100),1/12)-1);
  // if (day>28){
  //  monto = monto * (Math.pow((Math.pow((1+rate),((diaActual-28)/30))),-1))
  // }
  // return monto * (Math.pow(((Math.pow((1+rate),plazo)-1)/(rate*(Math.pow((rate+1),plazo)))),-1))
  return true
}
