import React, { Component }  from 'react';
import '../../styles/loan/formStepBar.module.css';
import '../../styles/loan/forms.module.css';
import '../../styles/loan/questions.module.css'
import useStyles from './styleRBMaterialui';
import StepBar from './stepBar5Steps';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import APIIdentityTest from '../apis/APIIdentityTest';
import styles from '../../styles/account/firstStepClient.module.css';
import styles2 from '../../styles/loan/firstStepEnter.module.css';


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

//Integer Decoder (ROL number n bits)
function decodeInteger(number,n){
  //Variables para desencriptar
  var answer=number;
  var aux;
  //Constante, máscara
  const andMasc=2147483648;
  //Contador
  var i;
  for (i=0; i<n; i++){
    //Obtener bit de la izquierda
    aux=answer & andMasc;
    aux=aux >>> 31;
    answer=answer << 1;
    answer=answer | aux;
  }
  return answer;

}

class QuestionsClientLoanView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOptionQ1:"1",
      valueOptionQ2:"1",
      valueOptionQ3:"1",
      incorrectAns : 0,
      questionsPerson :this.props.location.state.questionsPerson
      
    };
    this.submit = this.submit.bind(this);

    
  }
  
  componentDidMount(){
    window.scrollTo(0, 0);
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

  async submit(e) {
    e.preventDefault();
    const identityTestService = new APIIdentityTest();
    const responseVerifiyAnswers = await identityTestService.verifyIdentityTest(this.state.questionsPerson['testID'],
    parseInt(this.state.valueOptionQ1), parseInt(this.state.valueOptionQ2), parseInt(this.state.valueOptionQ3));

     
    if (responseVerifiyAnswers['result'] && !responseVerifiyAnswers['expired']){ //pass to next page
      //call step of select account
      this.props.history.push({
        pathname : '/SecondStepLoan',
        state :{
          dni : this.props.location.state.dni,
          data : this.props.location.state.data,

        }
        } );
    }else if(responseVerifiyAnswers['expired']){  
      this.props.history.push("/");  //redirect to home if the test expired
    }else{
      this.props.history.push("/InvalidAnswersMessage");  //redirect to an error page if the answers were incorrect
    }
   
  }

  render() {
    return (
      <div>
        <h1>Solicitud de Préstamo</h1>
         <StepBar current={0}/>  
         <div className={styles.row}>
              <div className={styles.column}>
                <img src="../../../pictures/loanImageSteps.jpg" width="100%" heigth="100%" alt="Beneficios"/>
              </div>
              <div className={styles.column}>
                <div  className='form-wrapper'>
                
                <form >
                <table >
                <br/><br/>
                  
                  <tr><h2>Hola, {this.props.location.state.data['personalInfo']['names']}<br></br><br></br>
                  Por tu seguridad, responde las siguientes preguntas para validar tu identidad:</h2></tr>
                  <br/><br/>

                  <tr >

                    <h4 id="ask">1) {this.state.questionsPerson['questions'][0]['question']}</h4>
                  </tr>
                  <tr id="centerGroupAnswer">
                      <FormControl component="fieldset">      
                      <RadioGroup  defaultValue="1" aria-label="choose" name="customized-radios" onChange={this.handleChangeRB1}>
                        <FormControlLabel  value="1" control={<StyledRadio />} label={this.state.questionsPerson['questions'][0]['1']}/>
                        <FormControlLabel value="2" control={<StyledRadio />} label={this.state.questionsPerson['questions'][0]['2']} />
                        <FormControlLabel value="3" control={<StyledRadio />} label={this.state.questionsPerson['questions'][0]['3']} />
                      </RadioGroup>
                      </FormControl>
                  </tr>
                  
                  <tr >
                    <h4 id="ask">2) {this.state.questionsPerson['questions'][1]['question']}</h4>
                  </tr>
                  <tr id="centerGroupAnswer">
                      <FormControl component="fieldset">      
                      <RadioGroup  defaultValue="1" aria-label="choose" name="customized-radios" onChange={this.handleChangeRB2}>
                        <FormControlLabel  value="1" control={<StyledRadio />} label={this.state.questionsPerson['questions'][1]['1']}/>
                        <FormControlLabel value="2" control={<StyledRadio />} label={this.state.questionsPerson['questions'][1]['2']} />
                        <FormControlLabel value="3" control={<StyledRadio />} label={this.state.questionsPerson['questions'][1]['3']} />
                      </RadioGroup>
                  </FormControl>
                  </tr>
                  
                  <tr >
                    <h4 id="ask">3) {this.state.questionsPerson['questions'][2]['question']}</h4>
                  </tr> 
                  <tr id="centerGroupAnswer">
                      <FormControl component="fieldset">      
                      <RadioGroup  defaultValue="1" aria-label="choose" name="customized-radios" onChange={this.handleChangeRB3}>
                        <FormControlLabel  value="1" control={<StyledRadio />} label={this.state.questionsPerson['questions'][2]['1']}/>
                        <FormControlLabel value="2" control={<StyledRadio />} label={this.state.questionsPerson['questions'][2]['2']} />
                        <FormControlLabel value="3" control={<StyledRadio />} label={this.state.questionsPerson['questions'][2]['3']} />
                      </RadioGroup>
                      </FormControl>
                  </tr>
                  <br/><br/><br/>
                  <tr id="centerGroupButton">   
                    
                    <button onClick={this.submit} className={styles2.buttonNextQuestions}>
                      Continuar
                    </button>
                  </tr>  
                  <br/><br/>

                
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


export default QuestionsClientLoanView;