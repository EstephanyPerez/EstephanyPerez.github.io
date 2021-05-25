import APIHandler from './APIHandler.js';

class APIOthers extends APIHandler{
    async getDate(){
        try {
            const data = await this.getRequest('http://servicioschaska.inf.pucp.edu.pe/Others/getDate');
            return data;
        } catch (error) {
            console.error(error);
        }
    }        
}
export default APIOthers;