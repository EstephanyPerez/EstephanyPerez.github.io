import axios from 'axios'

export function searchPersona(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Person/searchPerson', { dni: _id })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function consultPersonByDNI(_id) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Person/consultByID', { dni: _id })
    .then(response => {
      return response.data.result
    }).catch(e => {
      console.log(e)
    })
}
