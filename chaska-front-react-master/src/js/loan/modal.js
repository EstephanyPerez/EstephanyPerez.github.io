import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import APILoanDetail from '../apis/APILoanDetail.js';
import styles from '../../styles/loan/thirdStep.module.css';
class PaymentCalendarDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      calendar : [],
      tea: props.tea,
      amount: props.amount, 
      term: props.feeNumber,
      gracePeriod: props.gracePeriod
    };
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);

  }
  
  
  handleClickOpen = async () => {
    //alert(this.state.gracePeriod);
    this.setState({open:true});
    const serviceLoanDetail =new APILoanDetail ();
    const calendar = await serviceLoanDetail.getCalendar(this.state.tea, this.state.amount, this.state.term,this.state.gracePeriod);
    this.setState({calendar: calendar["calendar"]});

  };

  handleClose = () => {
    this.setState({open:false});
  };

  componentWillReceiveProps({amount, feeNumber, gracePeriod}) {
    this.setState({amount:amount,term: feeNumber, gracePeriod:gracePeriod})
  }

  render(){
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Visualizar Calendario de Pagos
      </Button>
      
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="paymentCalendar-dialog-title"
        aria-describedby="paymentCalendar-dialog-description"
        maxWidth={50+'vh'}
      >
        <DialogTitle id="paymentCalendar-dialog-title"><h1 className={styles.h1StyleModal}>Calendario de pagos</h1></DialogTitle>
        <DialogContent>
          <DialogContentText id="paymentCalendar-dialog-description">
            <table className={styles.tbStyle}>
              <tr className={styles.tbStyle}>
              <td className={styles.tbStyle}><h1 className={styles.h1Style1}>Día de Pago</h1></td>
              
              <td className={styles.tbStyle}><h1 className={styles.h1Style1}>Cuota</h1></td>
              <td className={styles.tbStyle} ><h1 className={styles.h1Style1}>Saldo Inicial</h1></td>
              <td className={styles.tbStyle}><h1 className={styles.h1Style1}>Amortización</h1></td>
              <td className={styles.tbStyle}><h1 className={styles.h1Style1}>Interés</h1></td>
              
              <td className={styles.tbStyle}><h1 className={styles.h1Style1}>Saldo Final</h1></td>
              
              </tr>
              {this.state.calendar.map((month) => 
                 <tr className={styles.tbStyleBody} key={month["PayDate"]}>
                     <td className={styles.tbStyleBody}>{month["PayDate"]}</td>
                     <td className={styles.tbStyleBody}>S/.{month["Fee"].toFixed(2)}</td>
                     <td className={styles.tbStyleBody}>S/.{month["SDI"].toFixed(2)}</td>
                     <td className={styles.tbStyleBody}>S/.{month["Amortization"].toFixed(2)}</td>
                     <td className={styles.tbStyleBody}>S/.{month["Interest"].toFixed(2)}</td>                     
                     <td className={styles.tbStyleBody}>S/.{month["SDF"].toFixed(2)}</td>                     
                 
                 </tr>
               )}
            
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );}
}

export default PaymentCalendarDialog;