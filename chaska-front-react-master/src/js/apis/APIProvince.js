import APIHandler from './APIHandler.js';

class APIProvince extends APIHandler{
    async queryByDepartment(_department){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Province/queryByDepartment', {department:_department})
            return data;
        } catch (error) {
            console.error(error);
        }
    }  



    
}

export default APIProvince;