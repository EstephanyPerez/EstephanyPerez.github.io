import APIHandler from './APIHandler.js';

class APIDepartment extends APIHandler{
    async queryAllDepartments(){
        try {
            const data = await this.getRequest('http://servicioschaska.inf.pucp.edu.pe/Department/queryAllDepartments');
            return data;
        } catch (error) {
            console.error(error);
        }
    }      
}

export default APIDepartment;