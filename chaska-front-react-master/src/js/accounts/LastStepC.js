import React, { Component } from 'react';
import { CreditCardRounded, AccountCircle, CheckCircleOutline,MonetizationOn } from '@material-ui/icons';
import useStyles from './styleMaterialui';
import '../../styles/lastStep.css';
import styles from '../../styles/account/lastStep.module.css';

//AccountCircle
//CheckCircleOutline

function CreditCardRoundedIcon() {
  const classes = useStyles();
  return (
    <CreditCardRounded className={classes.checkIcon}/>
  );
}
function AccountCircleIcon() {
  const classes = useStyles();
  return (
    <AccountCircle className={classes.checkIcon}/>
  );
}
function CheckCircleOutlineIcon() {
  const classes = useStyles();
  return (
    <CheckCircleOutline className={classes.checkIcon}/>
  );
}

function MonetizationOnIcon() {
  const classes = useStyles();
  return (
    <MonetizationOn className={classes.checkIcon}/>
  );
}


class SummaryAccount  extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      registerDate:""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    var f = new Date();
    this.state.registerDate = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
  };


  submit = async (e) =>{
    e.preventDefault();
    this.props.history.push("/");
  }

  render() {  
    this.componentDidMount() ;
    return(   
      <div className={styles.row}>
            <div className={styles.column}>
                <img src="../../../pictures/endStepAccount.jpg" width="100%" heigth="100%" alt="Beneficios"/>
            </div>
            <div className={styles.column}>
    
      
              <div className='border-box'>
                  <h4 style={{marginTop: 2+'%'}}>¡Listo!</h4>              
                  <div className={styles.centerGroup}>
                  <CheckCircleOutlineIcon/>
                  </div>
                  <h3 className={styles.subtitle}>Tu Cuenta {this.props.location.state.typeAccount} ha sido aperturada con éxito</h3>
                  <br/>
                
                          <h4 className={styles.minititle} >Datos de la cuenta</h4>
                                              
                        
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1} >Número de Cuenta:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} style={{color: '#2F70B8',  font: 'bold' }}>{this.props.location.state.accountData['idAccount']}</h2>
                            </div>
                          </div>
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1} >CCI:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} style={{color: '#2F70B8',  font: 'bold' }} >{this.props.location.state.accountData['cciAccount']}</h2>
                            </div>
                          </div>
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1}>Fecha de apertura:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1} >{this.state.registerDate}</h2>
                            </div>
                          </div>
                          <br/>  
                       
                
                        <h4 className={styles.minititle}>Datos personales</h4>
                        
                        <div className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1}>{this.props.location.state.clientData['personalInfo']['documentType']}</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1}>{this.props.location.state.clientData['personalInfo']['documentNumber']}</h2>
                            </div>
                          </div>
                          <div  className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1}>Nombre Completo:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1}>{this.props.location.state.clientData['personalInfo']['names']} {this.props.location.state.clientData['personalInfo']['firstLastName']} {this.props.location.state.clientData['personalInfo']['secondLastName']}</h2>
                              
                            </div>
                          </div>
                  
                  <div >
                        <h4 className={styles.minititle}>Datos de la entrega física de la tarjeta</h4>
                                              
                        <div className={styles.rowS}>
                            <div className={styles.columnS}>
                              <h2 className={styles.label1}>Dirección:</h2>
                            </div>
                            <div className={styles.columnS}>
                              <h2 className={styles.text1}>{this.props.location.state.accountData['local']}, {this.props.location.state.accountData['local_district']}, {this.props.location.state.accountData['local_province']}, {this.props.location.state.accountData['local_department']}</h2>
                            </div>
                        </div>
                          <br/>
                  
                  </div>
              </div>  
          </div>
      </div>
    
    )};
  
}

export default SummaryAccount;
