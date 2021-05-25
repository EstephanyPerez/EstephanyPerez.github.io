import axios from 'axios'

export function grantAccesssAdmin(data) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/User/verifyUser', data)
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function getPermisos(_roleID) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Role/getRoleByID', { roleID: _roleID })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function sendToken(_email) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/User/sendToken', { email: _email })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function validateToken(_register, _token) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/User/validateToken', { register: _register, token: _token })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}

export function updatePassword(_email, _newPassword) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/User/updatePassword', { email: _email, newPassword: _newPassword })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}
