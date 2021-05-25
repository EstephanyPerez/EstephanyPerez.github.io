import React, { Component }  from 'react';
import '../../styles/formStepBar.css';
import '../../styles/forms.css';
import '../../styles/questions.css';
import '../../styles/account/questionsInformation.css'
import styles from '../../styles/account/formIdentify.module.css';
import useStyles from './styleRBMaterialui';
import StepBar from './stepBar4Steps';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { style } from '@material-ui/system';


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

class QuestionsInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOptionQ1:"0",
      valueOptionQ2:"0",
      valueOptionQ3:"0",
      questionsAccount :this.props.location.state.dataQuestionsA,     
    };
   
  }

  handleChangeRB1 = (e) => {
    //debugger;
    this.setState({ valueOptionQ1: e.target.value });
  };
  handleChangeRB2 = (e) => {
    //debugger;
    this.setState({ valueOptionQ2: e.target.value });
  };
  handleChangeRB3 = (e) => {
    //debugger;
    this.setState({ valueOptionQ3: e.target.value });
  };
  submit = async (e) => {
    e.preventDefault(); 
    var answers;

    if (this.state.valueOptionQ1==="0" || this.state.valueOptionQ2==="0" ||this.state.valueOptionQ3==="0"){
       answers = [];
    }
    else {
      answers = [this.state.valueOptionQ1, this.state.valueOptionQ2,this.state.valueOptionQ3];
    }    


    this.props.history.push({
        pathname : '/ThirdStep',
        state :{
          client: this.props.location.state.client,
          locals : this.props.location.state.locals,
          typeAccount: this.props.location.state.typeAccount,
          abbrevAccount: this.props.location.state.abbrevAccount,
          answersAccount : answers,
          nearLocals:this.props.location.state.nearLocals ,

        }
        } 
      );
  }

  submitReturn  = async (e) => {
    e.preventDefault();  

    this.props.history.push({
      pathname : '/SecondStep',
      state :{
        data: this.props.location.state.client,
        dni: this.props.location.state.dni ,        
      }
      } 
    );
    
  }

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <h4>Cuenta { this.props.location.state.typeAccount}</h4>
         <StepBar current={2}/>  
         <div>   
          <div>
            <div className= {styles.row}>
              <div className={styles.column}>
                <img src="../../../pictures/bank.jpg" width="100%" heigth="100%" alt="Beneficios"/>
              </div>
              <div className={styles.column}>
                <div  className='form-wrapper'>
                
                <form onSubmit={this.submit}>
                <table >
                <br/><br/>
                  
                  <tr><h2>Antes de pasar al último paso, nos gustaría que nos ayudaras a responder las siguientes preguntas:</h2></tr>
                  <br/>
                  <tr >
                    <h4  id="ask">1)* {this.state.questionsAccount[0]['question']}</h4>
                  </tr>
                  <tr id="centerGroupAnswer">
                      <FormControl component="fieldset">      
                      <RadioGroup   aria-label="choose" name="customized-radios" onChange={this.handleChangeRB1}>
                        <FormControlLabel  value="1" control={<StyledRadio />} label={this.state.questionsAccount[0]['option1']}/>
                        <FormControlLabel value="2" control={<StyledRadio />} label={this.state.questionsAccount[0]['option2']} />
                        <FormControlLabel value="3" control={<StyledRadio />} label={this.state.questionsAccount[0]['option3']} />
                      </RadioGroup>
                      </FormControl>
                  </tr>
                  
                  <tr >
                    <h4 id="ask">2)* {this.state.questionsAccount[1]['question']}</h4>
                  </tr>
                  <tr id="centerGroupAnswer">
                      <FormControl component="fieldset">      
                      <RadioGroup   aria-label="choose" name="customized-radios" onChange={this.handleChangeRB2}>
                        <FormControlLabel  value="1" control={<StyledRadio />} label={this.state.questionsAccount[1]['option1']}/>
                        <FormControlLabel value="2" control={<StyledRadio />} label={this.state.questionsAccount[1]['option2']} />
                        <FormControlLabel value="3" control={<StyledRadio />} label={this.state.questionsAccount[1]['option3']} />
                      </RadioGroup>
                  </FormControl>
                  </tr>
                  
                  <tr >
                    <h4  id="ask">3)* {this.state.questionsAccount[2]['question']}</h4>
                  </tr> 
                  <tr id="centerGroupAnswer">
                      <FormControl component="fieldset">      
                      <RadioGroup  aria-label="choose" name="customized-radios" onChange={this.handleChangeRB3}>
                        <FormControlLabel  value="1" control={<StyledRadio />} label={this.state.questionsAccount[2]['option1']}/>
                        <FormControlLabel value="2" control={<StyledRadio />} label={this.state.questionsAccount[2]['option2']} />
                        <FormControlLabel value="3" control={<StyledRadio />} label={this.state.questionsAccount[2]['option3']} />
                      </RadioGroup>
                      </FormControl>
                  </tr>
                  <br/> 
                  <h7 className={styles.alert}>(*)Las preguntas no son obligatorias.</h7>
                  <br/><br/><br/>
                  <div className='row'  id="formcontrolQI">
                        <div className='col-sm-6'>
                          <button 
                            onClick={this.submitReturn} className="buttonPrevQI">Volver
                          </button>
                        </div> 
                        <div className='col-sm-6' >
                          <button 
                            onClick={this.submit} className= "buttonNextQI">Continuar
                          </button>
                        </div>      
                  </div>
                  <br/>
                  <br/>

                
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


export default QuestionsInformation;