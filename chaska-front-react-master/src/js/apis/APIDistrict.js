import APIHandler from './APIHandler.js';

class APIDistrict extends APIHandler{
    async queryByProvince(_province){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/District/queryByProvince', {province:_province})
            return data;
        } catch (error) {
            console.error(error);
        }
    }  



    
}

export default APIDistrict;