import React, { Component } from 'react';
import StepBar from './stepBar5Steps';
import styles2 from '../../styles/loan/fourthStep.module.css';
import APILoanLead from './../apis/APILoanLead';
import styles from '../../styles/account/firstStepClient.module.css';

class RegisterS4 extends Component  {
    
    constructor(props) {
        super(props);
        this.state = {
          accountSelected:0,
          firstCheck: false,
          secondCheck: false,
          openedTermsCondition:false,
          openedInformationBrochure:false,
          accountData: {},
         
        };
        this.handleCheck1=this.handleCheck1.bind(this);
        this.handleCheck2=this.handleCheck2.bind(this);
        this.handleChangeCB=this.handleChangeCB.bind(this);
        this.checkHasError=this.checkHasError.bind(this);
        
    }

    componentWillMount(){
    }
    
    
     
    checkHasError(){
        const { accountSelected } = this.state;
        return  accountSelected==0;
    }
        
    submit = async (e) => {
        e.preventDefault();
        /*const loanService= new APILoanLead();
        const response = await loanService.grantLoan(this.props.location.state.loanLeadId,
                                                     this.props.location.state.clientData);*/
        if (this.state.accountSelected>0){
        this.props.history.push({//falta enviar local selected
            pathname : '/FifthStepLoan',
                state :{
                    accountData : this.state.accountData,
                    clientData : this.props.location.state.clientData,
                    accounts: this.props.location.state.accounts,
                    loanLeadId:this.props.location.state.loanLeadId,
                    dni:this.props.location.state.dni,
                    amount: this.props.location.state.amount,
                    fees:this.props.location.state.fees,
                    TEA:this.props.location.state.TEA,
                    account:this.state.accountSelected,
                    terms:this.props.location.state.terms,
                    gracePeriod:this.props.location.state.gracePeriod,
                    currency:this.props.location.state.currency
                }
            } 
        );
        }  
         
    }

    submitPrev = async(e) =>{
        e.preventDefault();
        const loanLeadService = new APILoanLead();
        const leadAvailable = await  loanLeadService.consultLoanLeadsByClient(this.props.location.state.dni);
        this.props.history.push({
            pathname : '/ThirdStepLoan',
              state :{
                clientData : this.props.location.state.clientData,
                data : this.props.location.state.clientData,
                dni: this.props.location.state.dni,
                leadData: leadAvailable["loanLeads"],                
                                
              }
            } 
        );          
    }
   

    handleChangeCB(event){
        
        this.setState({accountSelected:event.target.value});
    }

    handleCheck1(event) {
        this.setState({firstCheck:!this.state.firstCheck});       
    }

    handleCheck2(event){
        this.setState({secondCheck:!this.state.secondCheck});     
    }

    componentDidMount(){
        window.scrollTo(0, 0);
      }

    render() { 
        let accounts = this.props.location.state.accounts['savingsAccounts'];
        let optionItems=[];
        if (accounts.length>0){
            optionItems = accounts.map((account) =>
                    <option value={account['savingAccount']}>{account['savingsAccount']}</option>
                );
        }
    return(   

        <div>
            <h4>Solicitud de Préstamo</h4>
            <StepBar current={3}/> 

            <div className={styles.row}>
                <div className={styles.column}>
                    <img src="../../../pictures/loanImageSteps.jpg" width="100%" heigth="100%" alt="Beneficios"/>
                </div>
                <div className={styles.column}>
                        
                        <div className='form-wrapper'>
                            <form>
                                <table>
                                    <tr><h2 style={{fontSize: 24+'px', fontWeight: 'normal', marginLeft:'30%'}}>Elige la cuenta en la que quieres recibir tu préstamo:</h2> 
                                    <h2>{}</h2> </tr>
                                    <br/><br/>
                                    {accounts.length?<tr className="centerGroup" ><h2 style={{fontSize: 22+'px', fontWeight: 'normal'}}>Cuenta: </h2>
                                    <select onChange={this.handleChangeCB}>
                                        <option value={0} selected>Seleccione una cuenta </option>
                                        {optionItems}
                                    </select>
                                    </tr>:null}
                                    {accounts.length==0?<h5 style={{paddingLeft:20+'vh'}}>Lo sentimos, en este momento no tienes con una cuenta.</h5>:null}
                                    <br/><br/>
                                    <div>
                                        <tr>
                                        <label type="label7" for="termsConditions">¿Quisieras aperturar una nueva cuenta? Puedes hacerlo 
                                        <a className ="label7" href='./Identifyform'>aquí.</a> </label>
                                        </tr>
                                        <br/><br/><br/><br/> 
                                        <div>    
                                            <div className='row' id="formcontrol2">
                                                <div className='col-sm-6 ' >
                                                <button onClick={this.submitPrev} className= "submit buttonPrev" id="buttonNext">
                                                    Volver
                                                </button>
                                                </div>
                                            
                                                <div className='col-sm-6'>       
                                                    <button onClick={this.submit} className={this.checkHasError() ? styles2.buttonNext3Grey : styles2.buttonNext3}>
                                                        Continuar
                                                    </button>
                                                </div> 
                                            </div>  
                                        </div>
                                        <br/><br/><br/><br/>
                                    </div>
                                </table>
                            </form>
                        </div>
                </div>
            </div>

            <br/><br/>
        </div>
      )

    };
}


export default RegisterS4;