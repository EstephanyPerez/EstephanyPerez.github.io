import React, { Component }  from 'react';
import '../../styles/formStepBar.css';
import '../../styles/forms.css';
import '../../styles/questions.css';
import styles from '../../styles/account/formIdentify.module.css';
import useStyles from './styleRBMaterialui';
import StepBar from './stepBar5Steps';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import APIIdentityTest from '../apis/APIIdentityTest';
import APIDepartment from './../apis/APIDepartment';
import APIPotentialClient from '../apis/APIPotentialClient';
import APIDistrict from '../apis/APIDistrict';
import APIProvince from '../apis/APIProvince';


import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #2F70B8;
    margin-left:46%;
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

class QuestionsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOptionQ1:"1",
      valueOptionQ2:"1",
      valueOptionQ3:"1",
      questionsPerson :this.props.location.state.questionsPerson,
      departments:{},
      provinces:{},
      loading: false,      
    };
   // this.setDepartmentsArray = this.setDepartmentsArray.bind(this);    
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
    const identityTestService = new APIIdentityTest();
    this.setState({loading:true});
    const responseVerifiyAnswers = await identityTestService.verifyIdentityTest(this.state.questionsPerson['testID'],
    parseInt(this.state.valueOptionQ1), parseInt(this.state.valueOptionQ2), parseInt(this.state.valueOptionQ3));
    
    
    if (responseVerifiyAnswers['result'] && !responseVerifiyAnswers['expired']){ //pass to next page      
      //call register client
      //this.setDepartmentsArray();
      const departmentsService = new APIDepartment();
      const potentialClientservice = new APIPotentialClient();
      const response_departments = await departmentsService.queryAllDepartments();
      this.setState({departments: response_departments});
      const resultPC = await potentialClientservice.consultPotentialClient(this.props.location.state.dataPerson['documentNumber']);
      
      if (resultPC["result"]){
        var dataPotentialClient=  await potentialClientservice.searchPotentialClient(this.props.location.state.dataPerson['documentNumber'], "Cliente");
        const provincesService = new APIProvince();
        const response = await provincesService.queryByDepartment(dataPotentialClient["contactInfo"]["idDepartment"]);
        var provinces_list = response["provinces"];
        const districtsService = new APIDistrict();
        const response2 = await districtsService.queryByProvince(dataPotentialClient["contactInfo"]["idProvince"]);
        var districts_list= response2['districts'];
        
                
        }
         
      
      this.props.history.push({
        pathname : '/RegisterClient',
        state :{
          departments : this.state.departments['departments'],
          dni: this.props.location.state.dataPerson['documentNumber'],
          dataPotentialClient: dataPotentialClient,
          enterBeforePC: resultPC["result"],
          provinces_list: provinces_list,
          districts_list: districts_list,
        }
        } 
      );

    }else if(responseVerifiyAnswers['expired']){  
      this.props.history.push("/");  //redirect to home if the test expired
    }else{
      this.props.history.push("/InvalidAnswersMessage");  //redirect to an error page if the answers were incorrect
    }
   
  }

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <h1>Cuenta de Ahorro</h1>
         <StepBar current={0}/>  
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
                  
                  <tr><h2>Hola, {this.props.location.state.dataPerson['names']}<br></br><br></br>
                  Por tu seguridad, responde las siguientes preguntas para validar tu identidad:</h2></tr>
                  <br/><br/>
                  <tr >

                    <h4  id="ask">1) {this.state.questionsPerson['questions'][0]['question']}</h4>
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
                    <h4  id="ask">3) {this.state.questionsPerson['questions'][2]['question']}</h4>
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
                  <br/> 
                  <tr id="centerGroupButton">   
                    
                    <button className="buttonContinue">
                      Continuar
                    </button>
                  </tr>  
                  <br/>
                  <br/>
                  <FadeLoader
                        css={override}
                        sizeUnit={"px"}
                        size={10}
                        color={'#2F70B8'}
                        loading={this.state.loading}/>
                  <br/><br/>

                
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


export default QuestionsView;