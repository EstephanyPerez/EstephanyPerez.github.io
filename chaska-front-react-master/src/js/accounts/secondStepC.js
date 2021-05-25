import React, { Component } from 'react';
//import { render } from 'react-dom';
import { CreditCardRounded, LocalAtmRounded, ScheduleRounded } from '@material-ui/icons';
import useStyles from './styleMaterialui';
import StepBar from './stepBar4Steps';
import '../../styles/prueba.css';
import '../../styles/forms.css';
import APILocal from '../apis/APILocal';
import APIAccount from '../apis/APIAccount';

function CreditCardRoundedIcon() {
  const classes = useStyles();
  return (
    <CreditCardRounded className={classes.creditIcon}/>
  );
}
function LocalAtmRoundedIcon() {
  const classes = useStyles();
  return (
    <LocalAtmRounded className={classes.dollarIcon}/>
  );
}
function ScheduleRoundedIcon() {
  const classes = useStyles();
  return (
    <ScheduleRounded className={classes.clockIcon}/>
  );
}



class RegisterSC2 extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      locals:{}
    };
  }
  submit = async ( typeAccount, abbrevAccount) => {
    //e.preventDefault();
    const localService = new APILocal();
    const accountService = new APIAccount();
    var principalDistrict = 0;
    if(this.props.location.state.data['addresses'][0]['type']==="Principal") principalDistrict = this.props.location.state.data['addresses'][0]['district'];
    else principalDistrict = this.props.location.state.data['emails'][1]['district'];
    const locals = await localService.consultLocal(principalDistrict); 
    this.state.locals=locals['otherLocals'];
    const dataQuestionsA =  await accountService.getSavingsAccountTest(this.props.location.state.dni);

    this.props.history.push({
      pathname : '/QuestionsInformationC',
      state :{        
        client: this.props.location.state.data,
        locals : this.state.locals,
        nearLocals: locals['nearLocals'],
        typeAccount: typeAccount,
        abbrevAccount: abbrevAccount,
        dataQuestionsA: dataQuestionsA,
        dni: this.props.location.state.dni,
      }
      } 
    );
  }

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {   
    return(   
      <div>
      <h4 >Cuenta de Ahorros</h4>
      <StepBar current={1}/> 
    
        <div>
           <div  className='rowS'>
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>¡Tenemos la cuenta perfecta para ti!</h4>
           </div>

          <div  className='rowS'>
            <div  className='columnS'>
               <div id="color-box">
               <br/>  
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>Cuenta Simple</h4>
                <img src="pictures/SimpleAccount.jpg"></img><br/><br/>
                <button className= 'buttonApply'  onClick={()=>this.submit('Simple', 'CS')} >
                  Solicitar</button><br/><br/>
              </div> 
                <h4 className="subtitles">Beneficios de la Cuenta Simple</h4>
                
                <div  className='rowBenefits'>
                <CreditCardRoundedIcon />
                <h2>
                  Ábrela desde S/. 0 y sin costo de mantenimiento
                </h2> 
                </div>
                <div  className='rowBenefits'>
                <LocalAtmRoundedIcon />
                <h2>
                  Realiza transferencias, pago de servicios, consultas y más por nuestra Banca Digital
                </h2> 
                
                </div>
                <div  className='rowBenefits'>
                <ScheduleRoundedIcon />
                <h2>
                  Siempre encontrarás un cajero cerca de ti
                </h2>
                </div>
                
            </div>
            <div  className='columnS'>
              <div  id="color-box"> 
              <br/>
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>Cuenta Súper Tasa</h4>
                <img src="pictures/SalaryAccount.jpg"></img><br/><br/>
                <button className= 'buttonApply' onClick={()=>this.submit('Súper Tasa', 'CST')}>
                      Solicitar</button><br/><br/>
              </div> 
                <h4 className="subtitles">Beneficios de la Cuenta Súper Tasa</h4>
                <div  className='rowBenefits'>
                <CreditCardRoundedIcon />
                <h2>
                 Abre tu cuenta hoy desde S/. 10,000 o US$ 5,000
                </h2> 
                </div>
                <div  className='rowBenefits'>
                <LocalAtmRoundedIcon />
                <h2>
                  Te ofrecemos una súper tasa de 4.5% para que hagas crecer tus ahorros
                </h2> 
                </div>
                <div  className='rowBenefits'>
                <ScheduleRoundedIcon />
                <h2>
                  Realiza transferencias y operaciones sin costo por nuestra Banca Digital las 24 horas del día
                </h2>
                </div>
            </div>
            <div  className='columnS'>
              <div  id="color-box"> 
              <br/>
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>Cuenta Millonaria</h4>
                <img src="pictures/MillionaireAccount.jpg"></img><br/><br/>
                <button className= 'buttonApply' onClick={()=>this.submit('Millonaria','CM' )}>
                      Solicitar</button><br/><br/>
                </div> 
                <h4 className="subtitles">Beneficios de la Cuenta Millonaria</h4>
                <div  className='rowBenefits'>
                <CreditCardRoundedIcon />
                <h2>
                  Abre tu cuenta hoy desde S/. 1500 o US$ 750 
                </h2> 
                </div>
                <div  className='rowBenefits'>
                <LocalAtmRoundedIcon />
                <h2>
                  Sorteamos un Depa + Auto + Viaje para un solo ganador
                </h2> 
                </div>
                <div  className='rowBenefits'>
                <ScheduleRoundedIcon />
                <h2>
                  Haz transferencias y operaciones sin costo por nuestra Banca Digital
                </h2>
                </div>
            </div>           
          </div>
          <br/>
          <br/>
        </div>
        </div>
        
    )};
  
}

export default RegisterSC2;
