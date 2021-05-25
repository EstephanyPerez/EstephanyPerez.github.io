import APIHandler from './APIHandler.js';

class APIClient extends APIHandler{
    async consultClient(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Client/consultByID', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async sendTokenMethod(_IDClient, _type, _value){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Client/sendToken', {IDClient: _IDClient, type: _type, value: _value})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async validateTokenMethod(_register, _token){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Client/validateToken', {register: _register, token: _token})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async validateTokenRequestsMethod(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Client/validateTokenRequestsNumber', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async validateTokenAttemptsMethod(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Client/validateTokenAttemptsNumber', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    

    async consultSpecialClient(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/SpecialClient/consultByID', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async consultStatusAsClient(_dni){
        var resClient = await this.consultClient(_dni);
        var resSpecialClient = await this.consultSpecialClient(_dni);
        if (resClient.result) return "Client";
        if (resSpecialClient.result) return "Blacklist";
        return "Not registered";
    }

   async consultDataClient(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Client/searchClient', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    } 

    async createClient(_address, _district, _email,  _cellphone, _operator, _dni, _type){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Client/createClient', {address:_address, district:_district,
            email:_email, cellphone: _cellphone, operator:_operator, dni:_dni, type:_type})
            return data;
        } catch (error) {
            console.error(error);
        }
    } 

    async consultSavingsAccountsByClient(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/consultSavingsAccountsByClient', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default APIClient;