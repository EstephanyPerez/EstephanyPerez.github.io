import React, { Component } from 'react';
import StepBar from './stepBar5Steps';
import '../../styles/termsConditions.css';
import APIAccount from '../apis/APIAccount.js';
import APIClient from '../apis/APIClient.js';
import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';
import styles from '../../styles/account/firstStepClient.module.css';
import useStyles from './styleRBMaterialui';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
 
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2F70B8;
    margin-left:60%;
`;
function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio      
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

class RegisterFNC4 extends Component  {
    
    constructor(props) {
        super(props);
        this.state = {
          localSelected:0,
          firstCheck: false,
          secondCheck: false,
          accountData: {},
          pdfTCDisabled: true,
          pdfBIDisabled: true,
          localStateIs0: true,
          loading:false,
          localRB: "1",
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleChangeCB=this.handleChangeCB.bind(this);
        this.handlePDFTC = this.handlePDFTC.bind(this);
        this.handlePDFBI = this.handlePDFBI.bind(this);
        this.checkHasError = this.checkHasError.bind(this);
        this.handleChangeLocal = this.handleChangeLocal.bind(this);
    
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    componentWillMount(){
        this.state.localSelected=0;
    }
    
               
        
    submit = async (e) => {
        
        e.preventDefault();
        if(this.state.firstCheck && this.state.secondCheck){
            this.setState({loading:true});
            this.refs.btn.setAttribute("disabled", "disabled");
            var localValue =-1;
            if (this.state.localRB==="1"){
                localValue = this.props.location.state.locals['nearLocals'][0]['id'];

            }
            else if(this.state.localRB==="2"){
                localValue = this.props.location.state.locals['nearLocals'][1]['id'];

            }
            else if(this.state.localRB==="3"){
                localValue = this.props.location.state.locals['nearLocals'][2]['id'];
            }
            else if(this.state.localRB==="0"){//more options
                localValue = this.state.localSelected;
                
            }   
            if (localValue >0){                  
            
            
            const accountService = new APIAccount();
            const clientService = new APIClient();   
            const response_client = await clientService.createClient(this.props.location.state.clientData['contactInfo']['address']  , this.props.location.state.clientData['contactInfo']['idDistrict'], this.props.location.state.clientData['contactInfo']['email'] ,this.props.location.state.clientData['contactInfo']['mobileNumber'] , this.props.location.state.clientData['contactInfo']['operator'] ,this.props.location.state.clientData['documentNumber'] , "Principal");
            const clientInf = await  clientService.consultDataClient(this.props.location.state.clientData['documentNumber']);

            const response= await accountService.createAccount(clientInf['personalInfo']['clientID'], localValue, this.props.location.state.abbrevAccount,"SOL");
            this.state.accountData = response;
            const resultA = accountService.insertSavingsAccountTest(clientInf['personalInfo']['clientID'], response['idAccount'], this.props.location.state.answersAccount);
            

            this.props.history.push({
                pathname : '/LastStep',
                  state :{
                    clientData : clientInf,
                    accountData : this.state.accountData,
                    typeAccount: this.props.location.state.typeAccount,
                    }
                } 
            );   
            
            }
            else{
                alert("No seleccionó un local")
            }
        }        
    }
   
    handlePDFTC(e){
        e.preventDefault();
        this.setState({pdfTCDisabled:false});
        window.open('./pdf/TermsAndConditions.pdf');
       
    }
    handlePDFBI(e){
        e.preventDefault();
        this.setState({pdfBIDisabled:false});
        window.open('./pdf/BrochureInformation.pdf');
    }

    handleChangeCB(event){
        this.state.localSelected=event.target.value;
        if (this.state.localSelected==0)
          this.setState({localStateIs0:true});
        else 
            this.setState({localStateIs0:false}); 
    }

    handleInputChange(event) {
        if(event.target.name==="firstCheck"){
            this.setState({firstCheck: !this.state.firstCheck});
        }
        if(event.target.name==="secondCheck"){
            this.setState({secondCheck:!this.state.secondCheck});
        }        
    }

    checkHasError(){
        const { firstCheck, secondCheck, localRB,localStateIs0 } = this.state;
        return  (localRB==="0" & localStateIs0)|| !firstCheck || !secondCheck  ;
    }
    handleChangeLocal(e){
        e.preventDefault();
        this.setState({localRB:e.target.value});

    }

    render() { 
        let locals = this.props.location.state.locals['otherLocals'];
        let optionItems = [];
        if (locals.length>0){
            optionItems = locals.map((local) =>
                    <option value={local['id']}>{local['address']} {local['number']}, {local['district']}</option>
                );
        }
    return(   

        <div>
        <h4>Cuenta {this.props.location.state.typeAccount}</h4>
            <h5 className='centerGroup' style={{fontSize: 24+'px'}}>¡Ya estamos por terminar!</h5>
            <StepBar current={4}/> 
            <br/><br/>
            <div className={styles.row}>
                <div className={styles.column}>
                    <br/><br/><br/><br/>
                    <br/><br/><br/><br/>
                    <br/><br/>
                    <img src="../../../pictures/bank.jpg" width="100%" heigth="100%" alt="Beneficios"/>
                </div>
                <div className={styles.column}>
                        
                        <div className='form-wrapper'>
                            <form>
                                <table>
                                    <br/>
                                    <tr><h2 style={{fontSize: 24+'px', fontWeight: 'normal', textAlign:'center'}}>Para recoger tu tarjeta puedes elegir la agencia de tu preferencia.</h2></tr>
                                    
                                    <tr><h2 style={{fontSize: 22+'px', fontWeight: 'normal'}}>Tu dirección actual es: {this.props.location.state.clientData['contactInfo']['address']}, {this.props.location.state.clientData['contactInfo']['nameDistrict']}</h2> </tr>
                                    <tr className="centerGroup" ><h2 style={{fontSize: 22+'px', fontWeight: 'normal'}}>Las 3 agencias más cercanas a ti son: </h2></tr>
                                    <div className={styles.row3}>                                      
                                        <div className={styles.column3}>
                                            <h2 className={styles.optionLabel}>Opción 1</h2>
                                            <img src="pictures/local1.png"></img>
                                            <h2 style={{textAlign:'center',fontSize: 22+'px', fontWeight: 'normal'}}>{ this.props.location.state.locals['nearLocals'][0]['address']} {this.props.location.state.locals['nearLocals'][0]['number']}, {this.props.location.state.locals['nearLocals'][0]['district']}</h2>                                               
                                            
                                        </div>
                                        <div className={styles.column3}>
                                            <h2 className={styles.optionLabel}>Opción 2</h2>
                                            <img src="pictures/local2.png"></img>
                                            <h2 style={{textAlign:'center',fontSize: 22+'px', fontWeight: 'normal'}}>{this.props.location.state.locals['nearLocals'][1]['address']} {this.props.location.state.locals['nearLocals'][1]['number']}, {this.props.location.state.locals['nearLocals'][1]['district']}</h2>     
                                            
                                        </div>
                                        <div className={styles.column3}>  
                                            <h2 className={styles.optionLabel}>Opción 3</h2>
                                            <img src="pictures/local3.png"></img>
                                            <h2 style={{textAlign:'center',fontSize: 22+'px', fontWeight: 'normal'}}>{this.props.location.state.locals['nearLocals'][2]['address']} {this.props.location.state.locals['nearLocals'][2]['number']}, {this.props.location.state.locals['nearLocals'][2]['district']}</h2>   
                                        </div>
                                    
                                    </div>
                                    <br/>
                                    <tr><h2>Selecciona la opción de tu preferencia</h2></tr>
                                    <tr id="centerGroupAnswer">
                                        <FormControl component="fieldset">      
                                        <RadioGroup  defaultValue="1" aria-label="choose" name="customized-radios" onChange={this.handleChangeLocal}>
                                            <FormControlLabel  value="1" control={<StyledRadio/>} label="Opción 1"/>
                                            <FormControlLabel value="2" control={<StyledRadio/>} label="Opción 2" />
                                            <FormControlLabel value="3" control={<StyledRadio/>} label="Opción 3" />
                                            <FormControlLabel value="0" control={<StyledRadio />} label="Más opciones" />
                                        </RadioGroup>
                                        </FormControl>
                                    </tr>
                                    {this.state.localRB==="0"? 
                                        <tr className="centerGroup" ><h2 style={{fontSize: 22+'px', fontWeight: 'normal'}}>Otras agencias: </h2>
                                        <select onChange={this.handleChangeCB}>
                                            <option value={0}>Seleccionar agencia</option>
                                            {optionItems}
                                        </select>
                                        </tr>:""
                                    }
                                    <br/><br/>
                                    <div>
                                        <input type="checkbox" disabled={this.state.pdfTCDisabled} name="firstCheck" id="termsConditions"  onChange={this.handleInputChange}/>
                                        <label className="label7" for="termsConditions">*He leído y acepto los </label>
                                        <a className ="label7" href='./pdf/TermsAndConditions.pdf' target= "_blank" onClick={this.handlePDFTC}>Términos y Condiciones</a>
                                        <br/>
                                        <input  type="checkbox" disabled={this.state.pdfBIDisabled}  name="secondCheck" id="InfoBooklet" onChange={this.handleInputChange}/>
                                        <label className="label7" for="InfoBooklet">*He leído y acepto las Condiciones de la </label>
                                        <a className ="label7" href='./pdf/BrochureInformation.pdf' target= "_blank" onClick={this.handlePDFBI}>Cartilla Informativa</a>
                                        <br/><br/>
                                        <h7 className={styles.alert}>(*)Debe abrir los documentos respectivos para continuar</h7>
                                        <br/><br/>     
                                        <button ref="btn" onClick={this.submit} className={this.checkHasError() ? "buttonNext3Grey" : "buttonNext3"} >Aperturar Cuenta</button>
                                        <br/><br/>
                                        <FadeLoader
                                            css={override}
                                            sizeUnit={"px"}
                                            size={10}
                                            color={'#2F70B8'}
                                            loading={this.state.loading}
                                        />
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


export default RegisterFNC4;