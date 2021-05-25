import APIHandler from './APIHandler.js';

class APISaleFile extends APIHandler{
    async consultNumberOfActiveSaleFilesLoan(_idClient){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/SaleFile/consultNumberOfActiveSaleFilesLoan', {'dni': _idClient})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

   
}

export default APISaleFile;