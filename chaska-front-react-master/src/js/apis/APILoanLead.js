import APIHandler from './APIHandler.js';

class APILoanLead extends APIHandler{
    async consultLoanLeadsByClient(_idClient){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/LoanLead/consultLoanLeadsByClient', {'dni': _idClient})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async grantLoan(_loanLeadID,_clientID,_savingsAccountID,_amount,_fees,_gracePeriod){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/Loan/grantLoan', {'loanLeadID': _loanLeadID, 'clientID':_clientID,'savingsAccountID':_savingsAccountID,'amount':_amount,'fees':_fees,'gracePeriods':_gracePeriod})
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default APILoanLead;