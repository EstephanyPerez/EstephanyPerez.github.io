import APIHandler from './APIHandler.js';

class APIPerson extends APIHandler{
    async consultPerson(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Person/consultByID', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }    

    async consultDataPerson(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Person/searchPerson', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }   
}

export default APIPerson;