import APIHandler from './APIHandler.js';

class APIPotentialClient extends APIHandler{
    async insertPotentialClient(_dni, _address, _district, _email, _cellphone, _operator){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/PotentialClient/insertPotentialClient', {dni: _dni,address: _address, district:_district, email:_email, cellphone:_cellphone, operator:_operator})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async searchPotentialClient(_dni, _user){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/PotentialClient/searchPotentialClient', {dni: _dni, user: _user })
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async consultPotentialClient(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/PotentialClient/consultPotentialClient', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    
}

export default APIPotentialClient;