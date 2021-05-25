import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styles2 from '../../styles/loan/firstStep.module.css';
import StepBar from './stepBar5Steps';
import APIClient from '../apis/APIClient.js';
import APIIdentityTest from '../apis/APIIdentityTest';
import styles from '../../styles/account/firstStepClient.module.css';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    color: '#47525E',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    color: '#47525E',
    backgroundColor: '#2F70B8',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

// Inspired by blueprintjs
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



class RegisterLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOption: "1",
      data: {},
      valOpt:"",
      hidedEmail:"",
      hidedCellphone:""
    };
  }

  

  handleChange = (e) => {
    debugger;
    this.setState({ valueOption: e.target.value });
  };
  
  submitPrev= async (e) => {
    e.preventDefault();

    const identityTestService = new APIIdentityTest();
    const questionIdentity = await identityTestService.generateIdentityTest(this.props.location.state.dni);
    this.props.history.push({
      pathname : '/QuestionsClientLoan',
        state :{
          data: this.props.location.state.data,
          dni: this.props.location.state.dni,
          questionsPerson: questionIdentity ,
        }
    });


    

  }
  submit = async (e) => {
    e.preventDefault();
    const clientService= new APIClient();
    const dni = this.props.location.state.data['personalInfo']['documentNumber'];
   
    const responseTokenRequests =  await clientService.validateTokenRequestsMethod(dni);
    const attempts = responseTokenRequests['result'];

    var principalEmail = "";
    if(this.props.location.state.data['emails'][0]['type']==="Principal") principalEmail = this.props.location.state.data['emails'][0]['email'];
    else principalEmail = this.props.location.state.data['emails'][1]['email'];
    var principalCellphone = "";
    if(this.props.location.state.data['cellphones'][0]['type']==="Principal") principalCellphone = this.props.location.state.data['cellphones'][0]['number'];
    else principalCellphone = this.props.location.state.data['cellphones'][1]['number'];

    if(attempts < 3){
      if(this.state.valueOption==="1"){        
        const response= await clientService.sendTokenMethod(this.props.location.state.data['personalInfo']['clientID'],"email",principalEmail);
        this.state.data = response;
      }else if(this.state.valueOption==="2"){
        const response = await clientService.sendTokenMethod(this.props.location.state.data['personalInfo']['clientID'],"SMS",principalCellphone);
        this.state.data = response; 
      }
      if(this.state.valueOption=="1")  this.state.valOpt = this.state.hidedEmail;
        else if (this.state.valueOption=="2") this.state.valOpt = this.state.hidedCellphone;
        //alert(this.props.location.state.dni);
        this.props.history.push({
          pathname : '/FirstStepEnterLoan',
            state :{
              tokenRegister : this.state.data['register'],
              data: this.props.location.state.data,
              optionSelected: this.state.valOpt,
              dni: this.props.location.state.dni
              
            }
          } 
        );
    }
    else{
      this.props.history.push({
        pathname : '/LimitTryMessage'});
    }    
  }

  componentWillMount(){
    window.scrollTo(0, 0);
    var index=(this.props.location.state.data['emails'][0]['email'] ).indexOf("@");
    var hideEmail = "";
    if(this.props.location.state.data['emails'][0]['type']==="Principal") hideEmail = this.props.location.state.data['emails'][0]['email'];
    else hideEmail = this.props.location.state.data['emails'][1]['email'];
    if(index>5)var repl=hideEmail.substring(index-5,index);
    else var repl=hideEmail.substring(index-1,index);
    repl=hideEmail.substring(index-3,index);
    var hidedEmail=hideEmail.replace(repl,"******");
    //alert(hidedEmail);
    this.state.hidedEmail=hidedEmail;
    var hideCellphone = "";
    if(this.props.location.state.data['cellphones'][0]['type']==="Principal") hideCellphone = this.props.location.state.data['cellphones'][0]['number'];
    else hideCellphone = this.props.location.state.data['cellphones'][1]['number'];
    var repl2=hideCellphone.substring(5);
    var hidedCellphone=(hideCellphone).replace(repl2,"******");
    //alert(hidedCellphone);
    this.state.hidedCellphone=hidedCellphone;
  }

  render() {
    return (  
      
      <div>
        <h4 >Solicitud de Préstamo</h4>
        <StepBar current={0}/>  
        
        <div className={styles.row}>
          <div className={styles.column}>
            <img src="../../../pictures/loanImageSteps.jpg" width="100%" heigth="100%" alt="Beneficios"/>
          </div>
          <div className={styles.column}>
            <div  className={styles.formWrapper}>
            
            <form >
            <table >
            <br/><br/>
              <tr><h3 className={styles.titleForm}>Identifícate</h3></tr>
              <br/> <br/> <br/>
              <tr><h2 className={styles.justifyText}>Hola, {this.props.location.state.data['personalInfo']['names']}<br></br><br></br>
                Te enviaremos una clave para verificar tu identidad, elige como quieres recibirla:</h2></tr>
              <br/><br/>

              <tr className={styles.centerGroup}>
                <FormControl component="fieldset" id="formcontrol">      
                  <RadioGroup  defaultValue="1" aria-label="choose" name="customized-radios" onChange={this.handleChange}>
                    <FormControlLabel  value="1" control={<StyledRadio />} label={this.state.hidedEmail}/>
                    <FormControlLabel value="2" control={<StyledRadio />} label={this.state.hidedCellphone} />
                  </RadioGroup>
                </FormControl>
              </tr>
              <br></br><br></br><br></br>
              
              <div className='row' style={{marginLeft:4+'%'}}>

                <div className='col-sm-6 ' >
                  <button onClick={this.submitPrev} className= "submit buttonPrev" id="buttonNext">
                    ¿No son tus datos?
                  </button>
                </div>
              
                <div className='col-sm-6'>       
                  <button onClick={this.submit} className="submit buttonNext">
                    Continuar
                  </button>
                </div> 
              </div>  
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

export default RegisterLoan;