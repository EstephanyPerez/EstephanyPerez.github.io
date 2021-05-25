import React, { Component }  from 'react';
import { Textbox } from 'react-inputs-validation';
import { loadReCaptcha } from 'react-recaptcha-google';
import ReCaptchaComponent from './reCaptcha';
import APIClient from '../apis/APIClient.js';
import APIPerson from '../apis/APIPerson.js';
import '../../styles/formStepBar.css';
import '../../styles/forms.css';
import APIAccount from '../apis/APIAccount';
import APIIdentityTest from '../apis/APIIdentityTest';
import styles from '../../styles/account/formIdentify.module.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import stylesModal from '../../styles/modalMessage.module.css';


import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2F70B8;
    margin-left:60%;
`;

class CallForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      data: {},
      hasDniError: true,
      dniErrorMsg: "",
      captchaResponse: "",
      dataPerson:{},
      noPerson: false,
      loading: false,
      open: false,
    };
    this.submit = this.submit.bind(this);
    this.handleDniChange = this.handleDniChange.bind(this);
    this.checkHasError = this.checkHasError.bind(this);
  }


  componentDidMount() {
    loadReCaptcha();
    window.scrollTo(0, 0);
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

  handleClose = async (e) => {
    e.preventDefault();
    this.setState({open:false, noPerson:false});
    this.state.noPerson = false;
  };

  

  async submit(e) {
    this.setState({loading:true});
    e.preventDefault();
    if (this.checkHasError()) {
      return;
    }
    this.refs.btn.setAttribute("disabled", "disabled");
    const clientService = new APIClient();
    const response = await clientService.consultStatusAsClient(this.state.dni);
    if(response === "Blacklist") {
      this.props.history.push("/BlackListMessage");
    }
    if(response === "Client") {
      const accountService = new APIAccount();
      const responseNumberAccounts = await accountService.consultNumberAccounts(this.state.dni);
      const responseTokenRequests = await clientService.validateTokenRequestsMethod(this.state.dni);
      const responseTokenAttempts = await clientService.validateTokenAttemptsMethod(this.state.dni);
      const identityTestService = new APIIdentityTest();
      const numberAttempts = await identityTestService.consultNumberOfFailedTests(this.state.dni);
      //ask if the client write a wrong token in the last hour to pass 
      if (responseNumberAccounts['accounts']>=5){
         this.props.history.push("/LimitAccountMessage");
      }
      else if(responseTokenRequests['result']>=3 || responseTokenAttempts['result']>=3){
        this.props.history.push("/LimitTryMessage");
      }
      else if (numberAttempts["result"]>=1){
        this.props.history.push("/InvalidAnswersMessage");
      }
      else{
        const responseClient = await clientService.consultDataClient(this.state.dni);
        this.state.data=responseClient;
        this.props.history.push({
          pathname : '/FirstStep',
          state :{
            dni : this.state.dni,
            data : this.state.data
          }
          } 
        );
      }
    }
    if(response === "Not registered"){
      
      const personService = new APIPerson();
      const response = await personService.consultPerson(this.state.dni);
      const identityTestService = new APIIdentityTest();
      if(response["result"]==true){
        //ask if the person answer bad a question in the last hour to pass
        const numberAttempts = await identityTestService.consultNumberOfFailedTests(this.state.dni);
        
        if(numberAttempts["result"]>=1){
          this.props.history.push( '/InvalidAnswersMessage');
        }
        else {

          const infoPerson =await  personService.consultDataPerson(this.state.dni);
          this.state.dataPerson = infoPerson;
          const questionIdentity = await identityTestService.generateIdentityTest(this.state.dni);
          this.props.history.push({
            pathname : '/Questions',
            state :{
              dataPerson: this.state.dataPerson,
              questionsPerson: questionIdentity,
              
              
            }
            });
        }
      }else{
        this.setState({
          noPerson:true,
          loading:false,
          open: true
        });

                
      }
      
      
      
    }
  }


  render() {
    const { dni,dniErrorMsg } = this.state;
    const messageModal="El DNI que ha ingresado es inválido";
    return (
      <div >
        <div className= {styles.row}>
          <div className= {styles.column} >
            <img src="../../../pictures/benefitsAccounts.JPG" width="100%" heigth="auto" alt="Beneficios"/>
          </div>
          <div className={styles.column} >
            <div className={styles.formWrapper}>
                <br/>
                <br/>
                <form >
                <h1 className ={styles.title} >Cuenta de Ahorros</h1>
                <br/><br/><br/><br/><br/>
               
                  <h2 className ={styles.centerText} >¡Apertura tu cuenta en menos de 5 minutos!</h2>               
                  <br/>
                  <br/>
                  <div className='row'>    
                    <div className='col-sm-6'>                            
                    <label style={{paddingTop: 55+'px', fontSize: 18+'px', marginLeft: 28+'vh'}}>DNI:</label>
                    </div>  
                    <div className='col-sm-6'>   
                    <div 
                          onSubmit={
                            this.checkHasError()
                              ? e => {
                                  e.preventDefault();
                                  return;
                                }
                              : this.submit
                          }
                          style={{paddingTop: 50+ 'px', paddingLeft: 5+'vh'}}

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
                           
                  <div                     
                    onClick={
                      this.checkHasError()
                        ? e => {
                            e.preventDefault();
                            return;
                          }
                        : this.submit
                    }
                  >
                    <br/><br/><br/><br/>
                    
                      <div  style={{paddingLeft: 25+ 'vh', paddingRight:0+ 'auto'}}>
                        <ReCaptchaComponent 
                            onChange={(response) => { this.setState({ captchaResponse: response }); }} />
                      </div>
                      
                    
                    <br></br><br></br>                  
                      
                      
                      <button ref="btn"
                        className={this.checkHasError() ? "grayButton" : "blueButton"}>
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

                  <div>
                      {this.state.noPerson? (
                            <div>
                            <Dialog
                              open={this.state.open}
                              onClose={this.handleClose}
                              aria-labelledby="errorMessage-dialog-title"
                              aria-describedby="errorMessage-dialog-description"
                            >
                              <DialogTitle id="errorMessage-dialog-title"><h1 className={stylesModal.h1Title}>¡Upps! Algo salió mal</h1></DialogTitle>
                              <DialogContent>
                                <DialogContentText id="errorMessage-dialog-description">
                                  <p className={stylesModal.bodyText}> {messageModal} </p>
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>          
                                <Button onClick={this.handleClose} color="primary" >
                                  Volver a intentar
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>):("")}
                    </div>
                </form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>   
            </div>
          </div>        
        </div>
      </div>
    );
  }
}


export default CallForm;
