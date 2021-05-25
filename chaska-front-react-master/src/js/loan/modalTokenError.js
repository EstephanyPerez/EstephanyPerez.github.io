import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import APILoanDetail from '../apis/APILoanDetail.js';
import styles from '../../styles/loan/thirdStep.module.css';


class TokenError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error:false
    };
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);

  }
  
  
  handleClickOpen = async () => {
    this.setState({open:true});

  };

  handleClose = () => {
    this.setState({open:false});
  };

  componentWillReceiveProps({_error}) {
    this.setState({error:_error})
  }

  render(){
  return (
    <div>      
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="paymentCalendar-dialog-title"
        aria-describedby="paymentCalendar-dialog-description"
      >
        <DialogTitle id="paymentCalendar-dialog-title"><h1 className={styles.h1StyleModal}>¡Error!</h1></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h1>La clave ingresada es incorrecta.</h1>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );}
}

export default TokenError;