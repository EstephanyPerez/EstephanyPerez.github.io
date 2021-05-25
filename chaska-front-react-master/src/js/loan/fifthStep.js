import React, { Component } from 'react';
import StepBar from './stepBar5Steps';

import styles2 from '../../styles/loan/fifthStep.module.css';
import APILoanLead from './../apis/APILoanLead';

import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';
import styles from '../../styles/account/lastStep.module.css';
import '../../styles/termsConditions.css';

 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2F70B8;
    margin-left:49%;
`;



class RegisterS5  extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          accountSelected:0,
          firstCheck: false,
          secondCheck: false,
          openedTermsCondition:false,
          openedInformationBrochure:false,
          accountData: {},
          pdfTCDisabled: true,
          pdfBIDisabled: true,
          loading:false
        };
        this.handleCheck1=this.handleCheck1.bind(this);
        this.handleCheck2=this.handleCheck2.bind(this);
        this.checkHasError=this.checkHasError.bind(this);
        this.handlePDFTC = this.handlePDFTC.bind(this);
        this.handlePDFBI = this.handlePDFBI.bind(this);
    }

    componentWillMount(){
        //alert(this.props.location.state.terms);
    }

    
     
    checkHasError(){
        const { firstCheck, secondCheck } = this.state;
        return  !firstCheck || !secondCheck;
    }
    handlePDFTC(e){
        e.preventDefault();
        
        this.setState({pdfTCDisabled:false});
      
        window.open('./pdf/TermsAndConditionsLoan.pdf');
       
    }
    handlePDFBI(e){
        e.preventDefault();
        this.setState({pdfBIDisabled:false});
        window.open('./pdf/BrochureInformationLoan.pdf');
    }
        
    submit = async (e) => {
        
        e.preventDefault();
        const loanLeadService = new APILoanLead();
        const leadAvailable = await loanLeadService.consultLoanLeadsByClient(this.props.location.state.dni);
        if(this.state.firstCheck && this.state.secondCheck && (leadAvailable["loanLeads"].length >0)){
            this.setState({loading:true});
            this.refs.btn.setAttribute("disabled", "disabled");
            const loanService= new APILoanLead();
            const response = await loanService.grantLoan(this.props.location.state.loanLeadId,
                                                        this.props.location.state.clientData['personalInfo']['clientID'],
                                                        this.props.location.state.account,
                                                        this.props.location.state.amount,
                                                        this.props.location.state.terms,
                                                        this.props.location.state.gracePeriod);
            
            this.props.history.push({
                pathname : '/SixthStepLoan',
                    state :{
                        amount: this.props.location.state.amount,
                        terms:this.props.location.state.terms,
                        fees:this.props.location.state.fees,
                        TEA:this.props.location.state.TEA,
                        account:this.props.location.state.account,
                        clientData : this.props.location.state.clientData,
                        currency:this.props.location.state.currency                 
                    }
                } 
            );  
        }else if(leadAvailable["loanLeads"].length === 0){ //revisar
            this.props.history.push("/NoLeadsMessage");
        }
        
    }
    componentDidMount(){
        window.scrollTo(0, 0);
      }

    handleCheck1(event) {
        this.setState({firstCheck:!this.state.firstCheck});       
    }

    handleCheck2(event){
        this.setState({secondCheck:!this.state.secondCheck});     
    }

  render() {  
    return(   
        <div>
        <h4 >Solicitud de Préstamo</h4>
        <StepBar current={4}/> 

        <div className={styles.row}>
            <div className={styles.column}>
                <img src="../../../pictures/loanImageSteps.jpg" width="100%" heigth="100%" alt="Beneficios"/>
            </div>
            <div className={styles.column}>
                    <div className='border-box' styles={styles2.tableFifth}>
                        
                        <h2 ><strong>Por último, necesitamos tu confirmación:</strong></h2> 
                        <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Monto:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> S/. {this.props.location.state.amount}</h2>
                            </div>
                          </div>
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Plazo:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} style={{marginLeft:8+'vh'}} > {this.props.location.state.terms} meses</h2>
                            </div>
                          </div>
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Cuota:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> S/. {this.props.location.state.fees.toFixed(2)}</h2>
                            </div>
                          </div>
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>TEA:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> {this.props.location.state.TEA} %
                              </h2>
                            </div>
                          </div>
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Cuenta:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> {this.props.location.state.account}
                              </h2>
                            </div>
                          </div>
                          <br/>                                  
                            
                          
                        <br/><br/><br/>
                        <input  type="checkbox" disabled={this.state.pdfTCDisabled} name="firstCheck" id="termsConditions" onChange={this.handleCheck1} />
                        <label className="label7" for="termsConditions" >*He leído y acepto los 
                        <a href='./pdf/TermsAndConditionsLoan.pdf' target= "_blank"  onClick={this.handlePDFTC}> Términos y Condiciones</a></label>

                        <br/>
                    
                        <input type="checkbox" disabled={this.state.pdfBIDisabled} name="secondCheck" id="InfoBooklet" onChange={this.handleCheck2} />
                        <label className="label7" for="InfoBooklet">*He leído y acepto las Condiciones de la 
                        <a  href='./pdf/BrochureInformationLoan.pdf' target= "_blank" onClick={this.handlePDFBI} > Cartilla Informativa</a> </label>
                        <br/><br/>
                        <h7 className={styles2.alert}>(*)Debe abrir los documentos respectivos para continuar</h7>
                        <br/><br/><br/><br/> 

                        <div>    
                        <button ref="btn" onClick={this.submit} className={this.checkHasError() ? styles2.buttonNext3Grey : styles2.buttonNext3} >Solicitar Préstamo</button>
                        </div>
                        <br/><br/>
                        <FadeLoader
                            css={override}
                            sizeUnit={"px"}
                            size={10}
                            color={'#2F70B8'}
                            loading={this.state.loading}
                        />
                        <br/><br/><br/><br/>
                                
                                <br/><br/>
                                
                            
                        
                    </div>
            </div>
        </div>

        <br/><br/>
    </div>
    )};
  
}

export default RegisterS5;