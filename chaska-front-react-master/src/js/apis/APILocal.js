import APIHandler from './APIHandler.js';

class APILocal extends APIHandler{
    async consultLocal(_district){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Local/queryByDistrict', {'district': _district})
            return data;
        } catch (error) {
            console.error(error);
        }
    }    
}

export default APILocal;