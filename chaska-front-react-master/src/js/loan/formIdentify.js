import React, { Component }  from 'react';
import { Textbox } from 'react-inputs-validation';
import { loadReCaptcha } from 'react-recaptcha-google';
import ReCaptchaComponent from '../accounts/reCaptcha';
import APIClient from '../apis/APIClient.js';
import styles from '../../styles/loan/formIdentify.module.css';
import APIAccount from '../apis/APIAccount';
import APIIdentityTest from '../apis/APIIdentityTest';
import APISaleFile from '../apis/APISaleFile';
import APILoanLead from '../apis/APILoanLead';
import styles2 from '../../styles/account/formIdentify.module.css';

import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2F70B8;
    margin-left:40vh;
`;

class IdentifyLoanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      data: {},
      hasDniError: true,
      dniErrorMsg: "",
      captchaResponse: "",
      dataPerson:{},
      loading:false
    };
    this.submit = this.submit.bind(this);
    this.handleDniChange = this.handleDniChange.bind(this);
    this.checkHasError = this.checkHasError.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    loadReCaptcha();
  }

  checkHasError() {
    const { hasDniError, captchaResponse } = this.state;
    return  hasDniError || !captchaResponse;
  }


  handleDniChange(dni, e) {
    let hasDniError = true;
    let dniErrorMsg = "";
    if (dni.replace(/\s/g, "").length===8 && Number.isInteger(Number(dni.replace(/\s/g, "")))) {
      hasDniError = false;
    } else if(dni.replace(/\s/g, "")===""){
      dniErrorMsg = "El DNI no puede ser vacío";
    }else if(dni.replace(/\s/g, "").length!==8){
      dniErrorMsg = "El DNI debe tener 8 dígitos";
    }else if(Number.isInteger(Number(dni.replace(/\s/g, "")))===false){
      dniErrorMsg = "El DNI no puede ser decimal";
    }
    this.setState({ dni, hasDniError, dniErrorMsg });
  }

  async submit(e) {

    this.setState({loading:true});
    e.preventDefault();
    if (this.checkHasError()) {
      this.setState({loading:false});
      return;
    }
    this.refs.btn.setAttribute("disabled", "disabled");
    const clientService = new APIClient();
    const response = await clientService.consultStatusAsClient(this.state.dni);
    if(response === "Blacklist") {
      this.props.history.push("/BlackListMessage");
    }
    if(response === "Client") {
      const responseTokenRequests = await clientService.validateTokenRequestsMethod(this.state.dni);
      const responseTokenAttempts = await clientService.validateTokenAttemptsMethod(this.state.dni);
      const identityTestService = new APIIdentityTest();
      const numberAttempts = await identityTestService.consultNumberOfFailedTests(this.state.dni);
      const saleFileService = new APISaleFile();
      const loanLeadService = new APILoanLead();
      const numberSaleFile = await saleFileService.consultNumberOfActiveSaleFilesLoan(this.state.dni);
      const leadAvailable = await loanLeadService.consultLoanLeadsByClient(this.state.dni);

      //ask if the client write a wrong token in the last hour to pass 
      if(responseTokenRequests['result']>=3 || responseTokenAttempts['result']){
        this.props.history.push("/LimitTryMessage");
      }
      else if (numberAttempts["result"]>=1){
        this.props.history.push("/InvalidAnswersMessage");
      }
      else if (numberSaleFile["result"]>0){ //check if there is a sale file in process
        this.props.history.push("/LoanInProcessMessage"); //change this message   

      }
      else if (leadAvailable["loanLeads"].length ==0){ //if it is empty, the client doesn't have available leads
        this.props.history.push("/NoLeadsMessage"); //change this message
      }
      else{
        const responseClient = await clientService.consultDataClient(this.state.dni);
        this.state.data=responseClient;
        this.props.history.push({
          pathname : '/FirstStepLoan',
          state :{
            dni : this.state.dni,
            data : this.state.data
          }
          } 
        );
      }
    }
    if(response === "Not registered"){      
      
      this.props.history.push("/NoClientMessage"); 
      
    }
  }

  render() {
    const { dni,dniErrorMsg } = this.state;
    return (
      <div className="container-fluid">
        <div className={styles2.row}>
          <div className={styles2.column}>
            <img src="../../../pictures/loanBenefits.jpg" width="100%" heigth="auto" alt="Beneficios"/>
          </div>
          <div className={styles2.column}>
            <div className={styles2.formWrapper}>
                <br/><br/>   
                <form >        
                  <h1 className = {styles2.title}>Solicitud de Préstamo</h1>
                  <br/><br/><br/><br/><br/>
                  <h2 className={styles2.centerText}>¡No lo pienses más y haz realidad todas tus metas del año!</h2>               
                  <br/><br/>
                  <div className='row'>
                    
                    <div className='col-sm-6' >                               
                      <label style={{paddingTop: 55+'px', fontSize: 18+'px', marginLeft: 28+'vh'}}>DNI:</label>
                    </div>
                    <div className='col-sm-6'>
                    <div onSubmit={ this.checkHasError()? e => {
                                  e.preventDefault();
                                  return;}
                                  : this.submit
                                  
                          }    style={{paddingTop: 50+ 'px', paddingLeft: 5+'vh'}}
                                                
                        >
                          <Textbox 
                            
                            attributesInput={{ // Optional.
                              id: 'Number',
                              name: 'Number',
                              type: 'text', // Input type [text, password, number]. NOTE: provide "text" for better performance since different browsers run differently with "number".
                              placeholder: 'Ingrese su DNI aquí',                             
                            }}
                            value={dni} // Optional.[String].Default: "".
                            onChange={this.handleDniChange} // Required.[Func].Default: () => {}. Will return the value.
                            onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                            validationOption={{
                              check:false,
                              type: 'number', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                              length: 8
                            }}
                          />
                          {dniErrorMsg === "" ? (
                            ""
                          ) : (
                            
                            <div className="errorMsg">{dniErrorMsg}</div>
                          )}
                      </div>
                      </div>
                      </div>  
                    
                           
                  <div   onClick={ this.checkHasError() ? e => {
                            e.preventDefault();
                            return;
                        }
                        : this.submit }

                  >
                    <br/><br/>
                      <div  style={{paddingLeft: 25+ 'vh', paddingRight:0+ 'auto'}}>
                        <ReCaptchaComponent 
                            onChange={(response) => { this.setState({ captchaResponse: response }); }} />
                      </div>
                    
                    <br></br><br></br>
                     
                      <button ref="btn"
                        className={this.checkHasError() ? styles.grayButton : styles.blueButton}>
                        Continuar
                      </button>
                      <br/><br/>
                      <FadeLoader
                        css={override}
                        sizeUnit={"px"}
                        size={10}
                        color={'#2F70B8'}
                        loading={this.state.loading}
                      />
                    
                  </div>
                </form>
                <br/><br/><br/><br/>
            </div>
          </div>        
        </div>
      </div>
    );
  }
}


export default IdentifyLoanForm;
