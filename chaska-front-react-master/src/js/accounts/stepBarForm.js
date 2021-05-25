import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import StepBar from './stepbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Register from './firstStep';
import RegisterSC2 from './secondStepC';
import '../../styles/formStepBar.css';
import useStyles from './styleMaterialui';
//import RegisterF2C from './firstStepEnter';




class FormFirstStep extends Component {
  render() {
    return (
          
        <div > 
          <StepBar current={0}/>
          
        </div>
    );
  }
}

export default FormFirstStep;