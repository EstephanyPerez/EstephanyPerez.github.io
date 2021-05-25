import React, { Component } from 'react';
import styles from '../../styles/account/lastStep.module.css';
import '../../styles/termsConditions.css';
import styles2 from '../../styles/loan/fifthStep.module.css';
import styles3 from '../../styles/loan/sixthStep.module.css';


class RegisterS6  extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          openedTermsCondition:false,
          openedInformationBrochure:false,
          accountData: {}
        };
    }

    componentWillMount(){
        //alert(this.props.location.state.terms);
    }

    
     
    checkHasError(){
        const { firstCheck, secondCheck } = this.state;
        return  !firstCheck || !secondCheck;
    }
        
    submit = async (e) => {
        e.preventDefault();
        if(this.state.firstCheck && this.state.secondCheck)alert("radio");
        
        this.props.history.push({
            pathname : '/'
        });
    }

    componentDidMount(){
        window.scrollTo(0, 0);
      }


  render() {  
    return(   
        <div>

        <div className="row">
            <div className="col-sm-6">
                <img src="../../../pictures/loanImageSteps.jpg" width="100%" heigth="100%" alt="Beneficios"/>
            </div>
            <div className='col-sm-6'>
            <div className='border-box' styles={styles2.tableFifth}>
            <h4>¡Disfruta tu préstamo!</h4>          
            <div  className={styles.rowS}>
                <div className={styles.columnS}>
                    <h2><strong>{this.props.location.state.clientData['personalInfo']['names']}</strong>,</h2>
                </div>
            </div>  
            <div  className={styles.rowS}>
                <h2 style={{marginLeft:13+'vh'}}>Tu préstamo efectivo ha sido abonado con éxito.</h2> 
            </div>  
            
            <div  className={styles.rowS}>
                <div className={styles.columnS}>
                  <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Monto:</h2>
                </div>
                <div className={styles.columnS}>
                  <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> S/. {this.props.location.state.amount}</h2>
                </div>
              </div>
              <div  className={styles.rowS}>
                <div className={styles.columnS}>
                  <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Plazo:</h2>
                </div>
                <div className={styles.columnS}>
                  <h2 className={styles.text1} style={{marginLeft:8+'vh'}} > {this.props.location.state.terms} meses</h2>
                </div>
              </div>
              <div  className={styles.rowS}>
                <div className={styles.columnS}>
                  <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Cuota:</h2>
                </div>
                <div className={styles.columnS}>
                  <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> S/. {this.props.location.state.fees.toFixed(2)}</h2>
                </div>
              </div>
              <div  className={styles.rowS}>
                <div className={styles.columnS}>
                  <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>TEA:</h2>
                </div>
                <div className={styles.columnS}>
                  <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> {this.props.location.state.TEA} %
                  </h2>
                </div>
              </div>
              <div  className={styles.rowS}>
                <div className={styles.columnS}>
                  <h2 className={styles.label1} style={{marginLeft:21+'vh'}}>Cuenta:</h2>
                </div>
                <div className={styles.columnS}>
                  <h2 className={styles.text1} style={{marginLeft:8+'vh'}}> {this.props.location.state.account}
                  </h2>
                </div>
              </div>
              <br/>     
              </div>
            </div>
        </div>

        <br/><br/>
    </div>
    )};
  
}

export default RegisterS6;