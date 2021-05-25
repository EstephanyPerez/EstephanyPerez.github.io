import React, { Component } from 'react';
import StepBar from './stepBar5Steps';
import styles2 from '../../styles/loan/thirdStep.module.css';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import PaymentCalendarDialog from '../loan/modal';
import APIClient from '../apis/APIClient.js';
import APIOthers from '../apis/APIOthers.js';
import styles from '../../styles/account/firstStepClient.module.css';

import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2F70B8;
    margin-left:47vh;
`;

function valuetext(value) {
  return `${value}m`;
}
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const LoanSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#5485C0',
  },
  mark: {
    backgroundColor: '#5485C0',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);


class ThirdStepLoan extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      annualEfectiveRate: this.props.location.state.leadData[0]["TEA"],
      term: this.props.location.state.leadData[0]["minFees"],    
      minTerm: this.props.location.state.leadData[0]["minFees"],
      maxTerm:this.props.location.state.leadData[0]["maxFees"],  
      amount: this.props.location.state.leadData[0]["minAmount"], 
      minAmount:this.props.location.state.leadData[0]["minAmount"],
      maxAmount:this.props.location.state.leadData[0]["maxAmount"],   
      fee: 0,  
      accountsdata:[]   ,
      date: 0, 
      gracePeriod:0,
      maxGrace:this.props.location.state.leadData[0]["maxGrace"],
      loading:false,
      currency:this.props.location.state.leadData[0]["currency"]
    };
    this.submit=this.submit.bind(this);
    this.calculateFee = this.calculateFee.bind(this);
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    

  } 

  
  calculateFee = ()=>{
    try{   
	  
	  //--Manu trying his best--------------------------------
	  //Get Day Value, shouldn't be a consult
      
      let day = this.state.date["day"];

	  //Get interest rate
      let rate=(Math.pow((1+this.state.annualEfectiveRate/100),1/12)-1);
      let amount=this.state.amount
      if (day>28){
        //Adjust amount
        let daysToPay=day-28
        amount=this.state.amount*(Math.pow((Math.pow((1+rate),(daysToPay/30))),-1))
      }
      let feeV=amount*(Math.pow(((Math.pow((1+rate),this.state.term)-1)/(rate*(Math.pow((rate+1),this.state.term)))),-1))
        this.setState({fee:feeV});
    }
    catch(e){
      console.error(e);

    }

  }

  handleChangePG=(e,value)=>{
   
    this.setState({gracePeriod:value});
    this.calculateFee();
    
  }

  handleChangeTerm =(e,value)=>{
   
    this.setState({term:value});
    this.calculateFee();
    
  }
  handleChangeAmount =(e,value)=>{
    
    this.setState({amount:value});
    this.calculateFee();
  }
 
  
  submitPrev= async (e) => {

    e.preventDefault();
    this.props.history.push({
      pathname : '/SecondStepLoan',
        state :{
          data : this.props.location.state.clientData,
          dni: this.props.location.state.dni,
        }
      } 
  ); 
      

  }
  submit = async (e) => {
    this.setState({loading:true});
    this.refs.btn.setAttribute("disabled", "disabled");
    e.preventDefault();
    const clientService= new APIClient();
    const accountslist = await clientService.consultSavingsAccountsByClient(this.props.location.state.dni);

    this.state.accountsdata=accountslist;
    this.props.history.push({
      pathname : '/FourthStepLoan',
        state :{
          clientData : this.props.location.state.clientData,
          accounts: this.state.accountsdata,
          leadData: this.props.location.state.leadData,
          loanLeadId:this.props.location.state.leadData[0]['loanLeanID'],
          dni:this.props.location.state.dni,
          amount: this.state.amount,
          fees:this.state.fee,
          terms:this.state.term,
          TEA:this.state.annualEfectiveRate,
          gracePeriod:this.state.gracePeriod,
          currency:this.state.currency
        }
      } 
  );           
    
  }

  componentWillMount= async()=>{
      const serviceOthers = new APIOthers();
      const date = await serviceOthers.getDate(); 
      this.state.date = date;
      this.calculateFee();
      window.scrollTo(0, 0);
  }

  componentDidMount(){
    
    //window.scrollTo(0, 0);
  }

  render() {
    let payment =<PaymentCalendarDialog  
     tea = {this.state.annualEfectiveRate}                                                            
     amount = {this.state.amount}                                                          
     feeNumber = {this.state.term} 
     gracePeriod= {this.state.gracePeriod}/>
    this.componentDidMount();
    return (  
      
      <div>
        <h4 >Solicitud de Préstamo</h4>
        <StepBar current={2}/>  
        
        
        <div className={styles.row}>    
          <div className={styles.column}>
            <img src="../../../pictures/loanImageSteps.jpg" width="100%" heigth="100%" alt="Beneficios"/>
          </div>
          <div className={styles.column}>
            <div  className='form-wrapper'>
            
            <form >
            <table >
            <br/><br/>
              
              <tr><h2>A continuación, puedes simular tu Préstamo Efectivo y conocer el valor de tus cuotas</h2></tr>
              <br/><br/>

              <tr><label className={styles.labelStyle}>TEA:</label>
                  <text className={styles.textStyleFee}>  {this.state.annualEfectiveRate}%</text>    
              </tr>
              <br/><br/>
              <tr><label className={styles.labelStyle}>Moneda:</label>
                  <text className={styles.textStyleCurr}> SOLES</text>    
              </tr>
              <br/><br/>
              <tr>
                  <label className={styles.labelStyleRange}>Monto Actual:</label>
                  <text className={styles.textStyleData}>S/. {this.state.amount}</text>
                
              </tr>
              <br/><br/>
              <tr>   
                  <LoanSlider
                    
                    defaultValue={this.state.minAmount}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={this.props.location.state.leadData[0]["varAmount"]}
                    marks
                    min={this.state.minAmount}
                    max={this.state.maxAmount}
                    onChange={this.handleChangeAmount}
                  />
              </tr>
              <tr>
                  <text className={styles.textStyle}>S/.{this.state.minAmount} - S/.{this.state.maxAmount} </text>
                                      
              </tr>
              <br/><br/>
              <tr>
                  <label className={styles.labelStyleRange}>Plazo Actual:</label>
                  <text className={styles.textStyleData}>  {this.state.term} meses</text>
                  
              </tr>
              <br/><br/>
              <tr>    
                  <LoanSlider                        
                    defaultValue={this.state.minTerm}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={this.props.location.state.leadData[0]["varFees"]}
                    marks 
                    min={this.state.minTerm}
                    max= {this.state.maxTerm}
                    onChange={this.handleChangeTerm}
                  />
              </tr>
              <tr>
                  <text className={styles.textStyle}>{this.state.minTerm} m - {this.state.maxTerm} m</text>
              </tr>
              
              {this.state.maxGrace? <br></br>:null}

              {this.state.maxGrace? <tr>
                  <label className={styles.labelStyleRange}>Periodos de Gracia:</label>
                  <text className={styles.textStyleData2}>  {this.state.gracePeriod} meses</text>
                  
              </tr>:null}
              <br/><br/>

              {this.state.maxGrace? <tr>    
                  <LoanSlider                        
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks 
                    min={0}
                    max= {this.state.maxGrace}
                    onChange={this.handleChangePG}
                  />
              </tr>:null}
              {this.state.maxGrace? <tr>
                  <text className={styles.textStyle}>0 m - {this.state.maxGrace} m</text>
              </tr>:null}

              <br></br>
              <tr><label className={styles.labelStyle}>Cuota:</label>
                  <text className={styles.textStyleFee2} >  S/. {this.state.fee.toFixed(2)}</text>
              </tr>
              <br/><br/>
              <tr> 
                <div  className={styles2.centerB}>                  
                  {payment}                
                </div>
                
              </tr>
                
              <br></br><br></br>
              
              <div className='row' id="formcontrol2">
                
                <div className='col-sm-6 ' >
                  <button onClick={this.submitPrev} className= "submit buttonPrev" id="buttonNext">
                    Volver
                  </button>
                </div>
              
                <div className='col-sm-6'>       
                  <button ref="btn" onClick={this.submit} className="submit buttonNext">
                    Continuar
                  </button>
                  
                </div> 
                
              </div>  
              <br/><br/>
              <FadeLoader
                        css={override}
                        sizeUnit={"px"}
                        size={10}
                        color={'#2F70B8'}
                        loading={this.state.loading}
              />
              <br></br><br></br>      

            </table>                
              
            </form>
            </div>
          </div>
        </div>        
            
        
        <br/><br/>
      </div>
      
    );
    
  }
}

export default ThirdStepLoan;
