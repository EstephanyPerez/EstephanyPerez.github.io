import React, { Component }  from 'react';
import '../../styles/formStepBar.css';
import '../../styles/forms.css';
import '../../styles/registerClient.css';
import styles from '../../styles/account/formIdentify.module.css';
import StepBar from './stepBar5Steps';
import { Textbox } from 'react-inputs-validation';
import APIProvince from './../apis/APIProvince';
import APIDistrict from './../apis/APIDistrict';
import APIClient from './../apis/APIClient';
import APIPotentialClient from './../apis/APIPotentialClient';

class RegisterClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        departmentSelected:0,
        provinceSelected:0,
        districtSelected:0,
        address: "",
        checkState: false,
        hasEmailError: true,
        hasEmailSError: true,
        emailErrorMsg: "",
        emailSErrorMsg: "",         
        email: "",
        emailS: "",
        hasNumberError: true,
        hasNumberSError: true,
        numberErrorMsg: "",
        numberSErrorMsg: "",
        numberClient: "" ,
        numberClientS: "",
        operator:"Movistar",
        dataClient:[],
        departments: [],
        provinces:[],
        districts:[],
                    
    };
    this.checkHasError=this.checkHasError.bind(this);
    this.handleChangeCB1=this.handleChangeCB1.bind(this);
    this.handleChangeCB2=this.handleChangeCB2.bind(this);
    this.handleChangeCB3=this.handleChangeCB3.bind(this);
    this.handleChangeCB4=this.handleChangeCB4.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleAddressChange=this.handleAddressChange.bind(this);
    this.handleNumberChange=this.handleNumberChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.handleEmailSChange=this.handleEmailSChange.bind(this);
    this.handleNumberChange=this.handleNumberChange.bind(this);
    this.handleNumberSChange=this.handleNumberSChange.bind(this);
    this.submit=this.submit.bind(this);
  }
  async handleChangeCB1(e){
    this.state.departmentSelected=e.target.value;
    
    this.state.provinces=[];
    this.state.districts=[<option value="" selected>Seleccione un distrito</option>];
    const provincesService = new APIProvince();
    const response = await provincesService.queryByDepartment(this.state.departmentSelected);
    const provinces_list= response['provinces'];
    if (this.state.departmentSelected===0){
      this.state.provinces=[];
    }
    else {
      const provinceItems = provinces_list.map((province) =>
                  <option value={province['id']}>{province['name']}</option>
              );
      this.setState({provinces: provinceItems});
    }
  }  

  async handleChangeCB2(e){
    this.state.provinceSelected=e.target.value;

    this.state.districts=[];
    const districtsService = new APIDistrict();
    const response = await districtsService.queryByProvince(this.state.provinceSelected);
    const districts_list= response['districts'];
    if (this.state.provinceSelected===0){
      this.state.provinces=[];
    }
    else {
    const districtItems = districts_list.map((district) =>
                <option value={district['id']}>{district['name']}</option>
            );
    this.setState({districts: districtItems});
    }
  } 
  handleChangeCB3(e){
    this.setState({districtSelected: e.target.value});
  } 
  handleChangeCB4(e){
    this.setState({operator: e.target.value});
  } 
  handleInputChange(e){
    this.setState({checkState : !this.state.checkState});
  }
  
  handleAddressChange(address,e){
      this.setState({address:address});

  }
  handleEmailChange(email,e){
    let hasEmailError = true;
    let emailErrorMsg = "";
    if (email.replace(/\s/g, "").length>0 && email.includes("@") && email.substring(0, email.indexOf("@")).length>0 && 
        email.substring(email.indexOf("@"), email.length ).length>0 && email.substring(email.indexOf("@"), email.length ).includes(".")) {
        hasEmailError = false;
    } else if(email.replace(/\s/g, "")===""){
      emailErrorMsg = "El email es un campo requerido";
    }else{
      emailErrorMsg = "Email inválido";
      hasEmailError=true;
    }
    this.setState({email: email,hasEmailError: hasEmailError, emailErrorMsg:emailErrorMsg });


  }
  handleEmailSChange(email,e){
    let hasEmailError = true;
    let emailErrorMsg = "";
    if (email.replace(/\s/g, "").length>0 && email.includes("@") && email.substring(0, email.indexOf("@")).length>0 && 
        email.substring(email.indexOf("@"), email.length ).length>0 && email.substring(email.indexOf("@"), email.length ).includes(".")) {
        hasEmailError = false;
    } else if(email.replace(/\s/g, "")===""){
      emailErrorMsg = "El email es un campo requerido";
    }else{
      emailErrorMsg = "Email inválido";
    }
    this.setState({emailS: email,hasEmailSError: hasEmailError, emailSErrorMsg:emailErrorMsg });
  }
  
  handleNumberChange(numberClient,e){
    let hasNumberError = true;
    let numberErrorMsg = "";
    if (numberClient.replace(/\s/g, "").length===9 && Number.isInteger(Number(numberClient.replace(/\s/g, "")))) {
      hasNumberError = false;
    } else if(numberClient.replace(/\s/g, "")===""){
      numberErrorMsg = "El celular no puede ser vacío";
    }else if(numberClient.replace(/\s/g, "").length!==9){
      numberErrorMsg = "El celular debe tener 9 dígitos";
    }else if(Number.isInteger(Number(numberClient.replace(/\s/g, "")))===false){
      numberErrorMsg = "El celular no puede ser decimal";
    }
    this.setState({numberClient: numberClient,hasNumberError: hasNumberError, numberErrorMsg:numberErrorMsg });
  }
  handleNumberSChange(numberClientS,e){
    let hasNumberSError = true;
    let numberSErrorMsg = "";
    if (numberClientS.replace(/\s/g, "").length===9 && Number.isInteger(Number(numberClientS.replace(/\s/g, "")))) {
      hasNumberSError = false;
    } else if(numberClientS.replace(/\s/g, "")===""){
      numberSErrorMsg = "El celular no puede ser vacío";
    }else if(numberClientS.replace(/\s/g, "").length!==9){
      numberSErrorMsg = "El celular debe tener 9 dígitos";
    }else if(Number.isInteger(Number(numberClientS.replace(/\s/g, "")))===false){
      numberSErrorMsg = "Celular inválido";
    }
    this.setState({numberClientS: numberClientS,hasNumberSError: hasNumberSError, numberSErrorMsg:numberSErrorMsg });
  }

  checkHasError(){
    const { hasEmailSError , hasEmailError, hasNumberSError, hasNumberError} = this.state;
    return  hasEmailSError || hasEmailError || hasNumberSError || hasNumberError;
  }

  checkGreyButton(){
    return this.checkHasError() || !this.state.checkState || (this.state.departmentSelected==0) || (this.state.provinceSelected==0) || (this.state.districtSelected==0);
     
  }
  componentDidMount(){
    window.scrollTo(0, 0);
  }

 
  componentWillMount(){
    if (this.props.location.state.enterBeforePC){
      this.setState({address:this.props.location.state.dataPotentialClient["contactInfo"]["address"],
                    
                    email: this.props.location.state.dataPotentialClient["contactInfo"]["email"],
                    emailS: this.props.location.state.dataPotentialClient["contactInfo"]["email"],
                    numberClient: this.props.location.state.dataPotentialClient["contactInfo"]["mobileNumber"],
                    numberClientS: this.props.location.state.dataPotentialClient["contactInfo"]["mobileNumber"],
                    departmentSelected: this.props.location.state.dataPotentialClient["contactInfo"]["idDepartment"],
                    provinceSelected:this.props.location.state.dataPotentialClient["contactInfo"]["idProvince"],
                    districtSelected:this.props.location.state.dataPotentialClient["contactInfo"]["idDistrict"],
                    hasEmailError: false,
                    hasEmailSError: false,
                    hasNumberError: false,
                    hasNumberSError: false,
        });
        //province list
        const provinceItems = this.props.location.state.provinces_list.map((province) =>
                  <option value={province['id']}>{province['name']}</option>
              );
      
        this.setState({provinces: provinceItems});
        //district list
        const districtItems = this.props.location.state.districts_list.map((district) =>
                <option value={district['id']}>{district['name']}</option>
            );
        this.setState({districts: districtItems});

    

    }
        
  }


  

  async submit(e) {
    e.preventDefault();

    if (this.checkHasError() || !this.state.checkState || (this.state.departmentSelected==0) || (this.state.provinceSelected==0) || (this.state.districtSelected==0)) {
      alert("Uno de los campos obligatorios está vacío");
      return;
    }
    
    if (this.state.email!=this.state.emailS){
      alert("Los emails son diferentes");
      return;
    }

    if (this.state.numberClient!=this.state.numberClientS){
      alert("Los celulares son diferentes");
      return;
    }

    const potentialCLientService = new APIPotentialClient();   
    const potentialClient = await potentialCLientService.insertPotentialClient( this.props.location.state.dni, this.state.address, this.state.districtSelected, this.state.email, this.state.numberClient, this.state.operator);
    var dataPotentialClientR ;
    if (!this.props.location.state.enterBeforePC){
      dataPotentialClientR = await potentialCLientService.searchPotentialClient(this.props.location.state.dni, "Cliente");

    }
    else{
      dataPotentialClientR= this.props.location.state.dataPotentialClient;
    }
    
    this.props.history.push({
      pathname : '/ThirdStepNC',
      state :{
        dataClient:dataPotentialClientR,     
        dni: this.props.location.state.dni, 
      }
      });

  }


  render() {
    
    const {address,email, emailErrorMsg, emailS, emailSErrorMsg,numberClient, numberClientS,numberErrorMsg,numberSErrorMsg} = this.state;
    let departmentsAns = this.props.location.state.departments;
    let departmentItems = departmentsAns.map((department) =>
                <option value={department['id']}>{department['name']}</option>
            );

    return (
      <div>
        <h1>Cuenta de Ahorro</h1>
         <StepBar current={1}/>  
         <div >   
          <div >
            <div className= {styles.row}>
              <div className={styles.column}>
                <img src="../../../pictures/bank.jpg" width="100%" heigth="100%" alt="Beneficios"/>
              </div>
              <div className={styles.column}>
                <div  className='form-wrapper'>
                
                <form >
                <table >
                <br/><br/>
                  
                  <tr><h2 style={{textAlign: 'center'}}>¡Queremos conocerte para brindarte el mejor servicio!</h2></tr>
                  <br/><br/>

                  <tr>
                    <h4 style={{marginLeft: 60 +'px', fontSize: 30 +'px', justifyContent:'left', paddingBottom: 1+'%'}} >
                      Datos de vivienda</h4>
                  </tr>
                  <tr>
                    <label style={{marginLeft: 120 +'px',  justifyContent:'left'}} value="1" id="textbox0">Departamento:</label> 
                    { !this.props.location.state.enterBeforePC?
                    <select  style={{padding: 1 +'%', width: 37+'%'}} onChange={this.handleChangeCB1}>
                    <option value={0} selected>Seleccione un departamento</option>                      
                    {departmentItems}
                  </select> :
                    <select defaultValue={this.props.location.state.dataPotentialClient["contactInfo"]["idDepartment"]}  style={{padding: 1 +'%', width: 37+'%'}} onChange={this.handleChangeCB1}>
                      <option value={0} selected>Seleccione un departamento</option>                      
                      {departmentItems}
                    </select>
                    }

                  </tr><br></br>
                  <tr>
                    <label style={{marginLeft: 120 +'px',  justifyContent:'left'}} value="1" id="textbox-1">Provincia:</label> 
                    { !this.props.location.state.enterBeforePC?
                    <select style={{padding: 1 +'%', width: 37+'%'}} onChange={this.handleChangeCB2}  onSelect={this.handleChangeCB2}>
                      <option value={0} selected>Seleccione una provincia</option>
                      {this.state.provinces}
                    </select>:
                    <select defaultValue={this.props.location.state.dataPotentialClient["contactInfo"]["idProvince"]} style={{padding: 1 +'%', width: 37+'%'}} onChange={this.handleChangeCB2}  onSelect={this.handleChangeCB2}>
                    <option value={0} selected>Seleccione una provincia</option>
                    {this.state.provinces}
                    </select>
                    }

                  </tr><br></br>
                  <tr>
                    <label  style={{marginLeft: 120 +'px',  justifyContent:'left'}} value="1" id="textbox-2">Distrito:</label> 
                    {!this.props.location.state.enterBeforePC?
                    <select style={{padding: 1 +'%', width: 37+'%'}} onChange={this.handleChangeCB3}>
                      <option value={0} selected>Seleccione un distrito</option>
                      {this.state.districts}
                    </select>:
                    <select defaultValue={this.props.location.state.dataPotentialClient["contactInfo"]["idDistrict"]} style={{padding: 1 +'%', width: 37+'%'}} onChange={this.handleChangeCB3}>
                    <option value={0} selected>Seleccione un distrito</option>
                    {this.state.districts}
                    </select>
                    }

                  </tr><br></br>
                  <div className="row">
                    <label  style={{marginLeft: 135 +'px',  justifyContent:'left'}} id="textbox1">Dirección:</label> 
                    <Textbox 
                        attributesInput={{ // Optional.
                          id: 'address',
                          name: 'address',
                          type: 'text', // Input type [text, password, number]. NOTE: provide "text" for better performance since different browsers run differently with "number".
                          placeholder: 'Ingrese su dirección aquí',                             
                          }}
                        value={address} // Optional.[String].Default: "".
                        onChange={this.handleAddressChange} // Required.[Func].Default: () => {}. Will return the value.
                       
                    />
                  </div>
                  
                  <tr >
                    <h4 style={{marginLeft: 60 +'px', fontSize: 30+'px', justifyContent:'left', paddingBottom: 2+'%'}} >
                      Datos de contacto</h4>
                  </tr>
                  <div className="row" >
                    <label style={{marginLeft: 135 +'px',  justifyContent:'left'}} id="textbox2">Email:</label> 
                    <div 
                    >
                      <Textbox 
                        attributesInput={{ // Optional.
                          id: 'Number',
                          name: 'Number',
                          type: 'text', // Input type [text, password, number]. NOTE: provide "text" for better performance since different browsers run differently with "number".
                          placeholder: 'Ingrese su correo aquí',                             
                        }}
                        value={email} // Optional.[String].Default: "".
                        onChange={this.handleEmailChange} // Required.[Func].Default: () => {}. Will return the value.
                      />
                          {emailErrorMsg === "" ? ( "") : (                            
                            <div className="errorMsg">{emailErrorMsg}</div>
                          )}
                    </div> 

                  </div>
                  <br></br>
                  <div className="row" >
                    <label style={{marginLeft: 135 +'px',  justifyContent:'left'}} id="textbox3">Confirmar email:</label> 
                    <div 
                    >
                      <Textbox 
                        attributesInput={{ // Optional.
                          id: 'Number',
                          name: 'Number',
                          type: 'text', // Input type [text, password, number]. NOTE: provide "text" for better performance since different browsers run differently with "number".
                          placeholder: 'Ingrese su correo aquí',                             
                        }}
                        value={emailS} // Optional.[String].Default: "".
                        onChange={this.handleEmailSChange} // Required.[Func].Default: () => {}. Will return the value.
                        
                      />
                          {emailSErrorMsg === "" ? ( "") : (                            
                            <div className="errorMsg">{emailSErrorMsg}</div>
                          )}
                    </div> 
                  </div>
                  <br></br>
                  <div className="row">
                    <label style={{marginLeft: 135 +'px',  justifyContent:'left'}} id="textbox9">Operador:</label> 
                    <select onChange={this.handleChangeCB4}>
                      <option value="Movistar">Movistar</option>
                      <option value="Claro">Claro</option>
                      <option value="Entel">Entel</option>
                      <option value="Bitel">Bitel</option>
                      <option value="Tuenti">Tuenti</option>
                    </select>

                  </div>
                  <br></br>
                  <div className="row" >
                    <label style={{marginLeft: 135 +'px',  justifyContent:'left'}} id="textbox4">Celular:</label> 
                    <div 
                    >
                      <Textbox 
                        attributesInput={{ // Optional.
                          id: 'Number',
                          name: 'Number',
                          type: 'text', // Input type [text, password, number]. NOTE: provide "text" for better performance since different browsers run differently with "number".
                          placeholder: 'Ingrese su celular aquí',                             
                        }}
                        value={numberClient} // Optional.[String].Default: "".
                        onChange={this.handleNumberChange} // Required.[Func].Default: () => {}. Will return the value.
                        onCopy="return false"
                      />
                          {numberErrorMsg === "" ? ( "") : (                            
                            <div className="errorMsg">{numberErrorMsg}</div>
                          )}
                    </div>

                  </div>
                  <br></br>
                  <div className="row">
                    <label style={{marginLeft: 135 +'px',  justifyContent:'left'}} id="textbox5">Confirmar celular:</label> 
                    <div 
                    >
                      <Textbox
                        attributesInput={{ // Optional.
                          id: 'Number',
                          name: 'Number',
                          type: 'text', // Input type [text, password, number]. NOTE: provide "text" for better performance since different browsers run differently with "number".
                          placeholder: 'Ingrese su celular aquí',                             
                        }}
                        value={numberClientS} // Optional.[String].Default: "".
                        onChange={this.handleNumberSChange} // Required.[Func].Default: () => {}. Will return the value.
                       
                      />
                          {numberSErrorMsg === "" ? ( "") : (                            
                            <div className="errorMsg">{numberSErrorMsg}</div>
                          )}
                    </div>

                  </div>
                  <br></br>
                  <tr >
                    <input style={{marginLeft: 130 +'px', justifyContent:'left', paddingTop:10+'px'}} type="checkbox" name="Check" id="PersonalInfo" onChange={this.handleInputChange}/>
                    <label className="label7" for="PersonalInfo">Autorizo el uso de mis datos personales y de contacto</label>
                  </tr>
                  <br></br>
                  <tr >   
                  
                    <button className={this.checkGreyButton() ? "buttonNext8Grey" : "buttonNext8"} onClick={this.submit}>
                      Continuar
                    </button>
                    
                    <br></br>
                    <br></br>
                  </tr>  

                
                </table>
                </form>
                </div>
              </div>
                
            </div>
          </div>
        </div>
        <br/><br/>
      </div>
    );
  }
}


export default RegisterClientView;