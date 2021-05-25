import { makeStyles } from '@material-ui/core/styles';
import '../../styles/loan/formStepBar.module.css';
import { FormatSize, CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    display: 'inline-block',
    margin: '5%',
    background: '#FFFFFF',
    border: '2px solid #2F70B8',
    color: '#2F70B8',
    borderRadius: '5px',
    textAlign: 'center',
   
  },
  nextButton:{
    display: 'inline-block',
    border:'2px solid #2F70B8',
    borderRadius:'5px',
    background: '#2F70B8',
    color: '#FFFFFF',
    textAlign: 'center',
    margin: '5%',

  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  styleS: {
    backgroundColor: 'transparent'
    
  },
  stepDesign:{
    weight:'40%',
    height:'40%',
    color: '#2F70B8',

  },

  creditIcon:{
    width: '10%',
    height: '10%',
    color: '#A42224',    
  },

  dollarIcon:{
    width: '10%',
    height: '10%',
    color: '#4F9C31',
    paddingBottom: '5%',
    
  },
  clockIcon:{
    width: '10%',
    height: '10%',
    color: '#FFBA5C',
   
  }  ,
  checkIcon:{
    width: '5%',
    height: '5%',
    color: '#77D353',
  },
  monetizationIcon:{
    width: '3%',
    height: '3%',
    color: '#4F9C31',
    paddingBottom: '2%',
  },

}));

export default useStyles;