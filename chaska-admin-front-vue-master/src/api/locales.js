import axios from 'axios'

export function getAllDepartments() {
  return axios.get('http://servicioschaska.inf.pucp.edu.pe/Department/queryAllDepartments')
    .then(response => {
      return response.data.departments
    }).catch(e => {
      console.log(e)
    })
}

export function getAllProvincesByDepartment(_department) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Province/queryByDepartment', { department: _department })
    .then(response => {
      return response.data.provinces
    }).catch(e => {
      console.log(e)
    })
}

export function getAllDistrictsByProvince(_province) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/District/queryByProvince', { province: _province })
    .then(response => {
      return response.data.districts
    }).catch(e => {
      console.log(e)
    })
}

export function getAllLocalByDistrict(_district) {
  return axios.post('http://servicioschaska.inf.pucp.edu.pe/Local/queryByDistrict', { district: _district })
    .then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
    })
}
