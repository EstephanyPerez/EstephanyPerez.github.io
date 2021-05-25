import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google'
import APIHandler from '../apis/APIHandler.js';
import { FormatAlignCenter } from '@material-ui/icons';

class ReCaptchaComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.captchaDemo) {
        this.captchaDemo.reset();
    }
  }

  onLoadRecaptcha() {
      if (this.captchaDemo) {
          this.captchaDemo.reset();
      }
  }
  async verifyCallback(recaptchaToken) {
    //console.log(recaptchaToken, "<= your recaptcha token")
    this.props.onChange(recaptchaToken)
  }
  render() {
    return (
      <div >
        {/* You can replace captchaDemo with any ref word */}
        
        <ReCaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            data-theme="dark"            
            render="explicit" 
            sitekey="6LfkGrwUAAAAAHuVLboJnH0bWo8tlv3DrmGluP8L"
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
        />
    
      </div>
    );
  };
};
export default ReCaptchaComponent;
