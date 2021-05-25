import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from '../../styles/modalMessage.module.css';

class NotificationNoPerson extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      open: true,
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

  

  render(){
  return (
    <div>     
      
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="errorMessage-dialog-title"
        aria-describedby="errorMessage-dialog-description"
      >
        <DialogTitle id="errorMessage-dialog-title"><h1 className={styles.h1Title}>¡Upps! Algo salió mal</h1></DialogTitle>
        <DialogContent>
          <DialogContentText id="errorMessage-dialog-description">
            <p className={styles.bodyText}> {this.props.message} </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={this.handleClose} color="primary" >
            Volver a intentar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );}
}

export default NotificationNoPerson;