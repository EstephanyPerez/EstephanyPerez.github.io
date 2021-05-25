import APIHandler from './APIHandler.js';

class APILoanDetail extends APIHandler{
    async getCalendar(_tea, _amount, _feenumber,_gracePeriod){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/LoanDetail/getCalendar', {TEA:_tea, amount: _amount, feeNumber:_feenumber,gracePeriods:_gracePeriod})
            return data;
        } catch (error) {
            console.error(error);
        }
    }  
    async getFeeValue(_tea, _amount, _feenumber){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/LoanDetail/getFeeValue', {TEA:_tea, amount: _amount, feeNumber:_feenumber})
            return data;
        } catch (error) {
            console.error(error);
        }
    }  


    
}

export default APILoanDetail;