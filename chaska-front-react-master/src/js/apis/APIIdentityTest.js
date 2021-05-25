import APIHandler from './APIHandler.js';

class APIIdentityTest extends APIHandler{
    async generateIdentityTest(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/IdentityTest/generateIdentityTest', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }   
    
    async verifyIdentityTest(_testID, _answer1, _answer2, _answer3){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/IdentityTest/verifyTest', {test: _testID, answer1: _answer1, answer2: _answer2, answer3: _answer3})
            return data;
        } catch (error) {
            console.error(error);
        }
    } 

    async consultNumberOfFailedTests(_dni){
        try {
            const data = await this.postRequest('http://servicioschaska.inf.pucp.edu.pe/IdentityTest/consultNumberOfFailedTests', {dni: _dni})
            return data;
        } catch (error) {
            console.error(error);
        }
    }  



    
}

export default APIIdentityTest;