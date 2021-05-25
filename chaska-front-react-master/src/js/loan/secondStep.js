import React, { Component } from 'react';
//import { render } from 'react-dom';
import { CreditCardRounded, LocalAtmRounded, ScheduleRounded } from '@material-ui/icons';
import useStyles from './styleMaterialui';
import StepBar from './stepBar5Steps';
import '../../styles/prueba.css';
import '../../styles/forms.css';
import APILoanLead from '../apis/APILoanLead';


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



class RegisterS2Loan extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  submit = async (e) => {
    e.preventDefault();
    const loanLeadService = new APILoanLead();
    const leadAvailable = await  loanLeadService.consultLoanLeadsByClient(this.props.location.state.dni);
      

    this.props.history.push({
      pathname : '/ThirdStepLoan',
      state :{        
        clientData: this.props.location.state.data,        
        dni: this.props.location.state.dni,
        leadData: leadAvailable["loanLeads"],
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
      <h4 >Solicitud de Préstamo</h4>
      <StepBar current={1}/> 
    
        <div>
           <div  className='rowS'>
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>¡Tenemos el préstamo perfecto para ti!</h4>
           </div>

          <div  className='rowS'>
            <div  className='columnS'>
               <div id="color-box">
               <br/>  
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>Efectivo</h4>
                <img src="pictures/personalloan.jpeg"></img><br/><br/>
                <h2>Obtén  un préstamo a tu medida, para hacer tus planes realidad. Remodela tu departamento, empieza tu propio negocio o paga tus deudas.</h2>
                <button className= 'buttonApply'  onClick={this.submit} >
                  Solicitar</button><br/><br/>
              </div> 
                <h4 className="subtitles">Beneficios del Préstamo Efectivo</h4>
                
                <div  className='rowBenefits'>
                <CreditCardRoundedIcon />
                <h2>
                Aprovecha una tasa más
                baja si tienes o creas
                cuenta en Chaska.
                </h2> 
                </div>
                <div  className='rowBenefits'>
                <LocalAtmRoundedIcon />
                <h2>
                Te prestamos hasta S/ 210,000 sin garantía.
                </h2> 
                
                </div>
                <div  className='rowBenefits'>
                <ScheduleRoundedIcon />
                <h2>
                    Puedes pagarlo desde 6 hasta 60 meses.
                </h2>
                </div>                
            </div>
            <div  className='columnS'>
              <div  id="color-box"> 
              <br/>
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>Hipotecario</h4>
                <img src="pictures/houseloan.jpg"></img><br/><br/>
                <h2>Chaska te ofrece las mejores condiciones para que puedas alcanzar el sueño de tener una casa propia y asegurar tu futuro.</h2>
                
                <button className= 'buttonApply' >
                      Solicitar</button><br/><br/>
              </div> 
                <h4 className="subtitles">Beneficios del Préstamo Hipotecario</h4>
                <div  className='rowBenefits'>
                <CreditCardRoundedIcon />
                <h2>Pre-paga, cambia la fecha de pago, plazo y/o cuota.</h2> 
                </div>
                <br></br>
                <div  className='rowBenefits'>
                <LocalAtmRoundedIcon />
                <h2>Obtén hasta el 90% de financiamiento.</h2> 
                </div>
                <div  className='rowBenefits'>
                <ScheduleRoundedIcon />
                <h2>
                  Paga tu crédito hasta en 25 años.
                </h2>
                </div>
            </div>
            <div  className='columnS'>
              <div  id="color-box"> 
              <br/>
                <h4 style={{color: '#2F70B8',  font: 'bold' }}>Vehicular</h4>
                <img src="pictures/vehicularloan.jpg"></img><br/><br/>
                <h2>Sistema de crédito flexible que se adapta a todas las necesidades. Lo más importante son las ganas que tengas de manejar tu propio carro.</h2>
                <button className= 'buttonApply' >
                      Solicitar</button><br/><br/>
                </div> 
                <h4 className="subtitles">Beneficios del Préstamo Vehicular</h4>
                <div  className='rowBenefits'>
                <CreditCardRoundedIcon />
                <h2>
                  Financiamos autos nuevos, semi-nuevos y usados.
                </h2> 
                </div>
                <div  className='rowBenefits'>
                <LocalAtmRoundedIcon />
                <h2>
                  Cuota inicial desde 0%.
                </h2> 
                </div>
                <br></br>
                <br></br>
                <div  className='rowBenefits'>
                <ScheduleRoundedIcon />
                <h2>
                Plazo de financiamiento hasta en 6 años.
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

export default RegisterS2Loan;
