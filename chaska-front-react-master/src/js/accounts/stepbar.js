
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../styles/stepBar.css';
import { Steps, Button, message } from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

class StepBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  render() {
    
    return (
        <div className="line">
            <Steps current={this.props.current}>
                <Step/>
                <Step/>
                <Step/>
            </Steps>
        </div>
    );
  }
}

export default StepBar;
          