import React, { Component, useRef } from 'react';
import { Textbox } from 'react-inputs-validation';
import StepBar from './stepBar4Steps';
import APIClient from '../apis/APIClient.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from '../../styles/modalMessage.module.css';
import stylesForm from '../../styles/account/firstStepEnter.module.css';
import '../../styles/firstStepEnter.css';

 
class RegisterF2C extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      hasPasswordError: true,
      counter:0,
      responseToken:"" ,
      tokenIncorrect: false,
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validateToken = this.validateToken.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  handlePasswordChange(_password, e) {      
    this.setState({password:_password});
  }

  
  validateToken(){
    if(this.state.responseToken==="timeout"){
      alert("La clave ha expirado, vuelva a solicitarla por favor");
      this.props.history.push({
        pathname : '/FirstStep',
        state :{
          data: this.props.location.state.data
        }});
    }
    if (this.state.counter <= 3){      
      if(this.state.responseToken==="tokenIncorrect"){
        //alert("token incorrecto")
        this.setState({tokenIncorrect:true});
        this.state.tokenIncorrect = true;
        
      }
      else if(this.state.responseToken==="tokenCorrect") {            
        this.props.history.push({
          pathname : '/SecondStep',
          state :{
            data : this.props.location.state.data,
            dni: this.props.location.state.dni, 
          }
        });
      }
    }
    else {
      this.props.history.push({
      pathname : '/LimitTryMessage'});
    }
    
  }
  
  handleClose = () => {
    this.setState({open:false, tokenIncorrect:false});
  };

  submit = async (e) => {
    e.preventDefault();
    const clientService= new APIClient();
    const tokenRegister = this.props.location.state.tokenRegister;
    const responseTokenValidation = await clientService.validateTokenMethod(tokenRegister,this.state.password);
    this.state.counter = responseTokenValidation['attempts'];
    this.state.responseToken = responseTokenValidation['result'];
    this.validateToken();    
  }

  submitPrev = async (e) => {
    e.preventDefault();
    this.props.history.push({
        pathname : '/FirstStep',
        state :{
          dni : this.props.location.state.dni,
          data : this.props.location.state.data
        }
      } 
    ); 
  }
  
  render(){
    const { tokenIncorrect } = this.state;
    const messageModal = "El token ingresado es incorrecto";
    return (    
      <div>
        <h4 style={{fontFamily:'Lato'}}>Cuenta de Ahorros</h4>
        <StepBar current={0}/> 
        <div className={stylesForm.row}>
          <div className={stylesForm.column}>
            <img src="../../../pictures/bank.jpg" width="100%" heigth="100%" alt="Beneficios"/>
          </div>
          <div className={stylesForm.column}>
              <div className={stylesForm.formWrapper}>
                  <br/>
                  <br/>
                
                  <form >
                  <h3 className={stylesForm.titleForm}>Identifícate</h3>
                  <br/><br/><br/><br/><br/><br/><br/><br/>                 
                  
                    <h2 className={stylesForm.centerText}>Ingresa la clave que te hemos enviado a:</h2><br/>
                    <h3 className={stylesForm.centerText} style={{ fontSize: 24+'px'}}>{this.props.location.state.optionSelected}</h3>               
                    <br/><br/><br/><br/>
                    <div className='row'>    
                                                    
                      <label htmlFor="password" style={{paddingTop: 55+'px', fontSize: 18+'px', marginLeft: 30+'vh'}}>Clave: </label>
                      <div  style={{paddingTop: 50+'px', paddingLeft: 5+'vh'}}>
                            <Textbox 
                              attributesInput={{
                                id: 'Number',
                                name: 'Number',
                                type: 'text', 
                                placeholder: 'Ingrese la clave recibida',                             
                              }}
                              value={this.state.password} 
                              onChange={this.handlePasswordChange} 
                              validationOption={{
                                type: 'number', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                              }}
                            />
                        </div>
                      </div>
                            
                    <div>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>  
                    <div>
                      {this.state.tokenIncorrect? (
                            <div>
                            <Dialog
                              open={true}
                              onClose={this.handleClose}
                              aria-labelledby="errorMessage-dialog-title"
                              aria-describedby="errorMessage-dialog-description"
                            >
                              <DialogTitle id="errorMessage-dialog-title"><h1 className={styles.h1Title}>¡Upps! Algo salió mal</h1></DialogTitle>
                              <DialogContent>
                                <DialogContentText id="errorMessage-dialog-description">
                                  <p className={styles.bodyText}> {messageModal} </p>
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

                    <br/><br/>          
                      <div className='row'  id="formcontrol2">
                        <div className='col-sm-6'>
                          <button 
                            onClick={this.submitPrev} className="buttonPrev1">Volver
                          </button>
                        </div> 
                        <div className='col-sm-6' >
                          <button 
                            onClick={this.submit} className= "buttonNext1">Continuar
                          </button>
                        </div>      
                      </div>
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

export default RegisterF2C;