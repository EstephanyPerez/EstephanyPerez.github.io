import APIHandler from './APIHandler.js';

class APIAccount extends APIHandler{
    async createAccount(_idClient,_idLocal, _accountType,_currencyType){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/openAccount', {'client': _idClient, 'local': _idLocal,'accountType':_accountType ,'currencyType':_currencyType})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async consultNumberAccounts(_idClient){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/consultAccountsNumber', {'client': _idClient})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getSavingsAccountTest(_idClient){
        try {
            const data = await this.getRequest('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/getSavingsAccountTest')
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async insertSavingsAccountTest(_idClient, _idSavingsAccount, _responsesList){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/SavingsAccount/insertSavingsAccountTest',{'clientID':_idClient, 'savingsAccountID':_idSavingsAccount,'responsesList': _responsesList})
            return data;
        } catch (error) {
            console.error(error);
        }
    }

}

export default APIAccount;