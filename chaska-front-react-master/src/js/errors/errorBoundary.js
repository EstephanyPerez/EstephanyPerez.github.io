
import React, { Component }  from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";
  
import { render } from "react-dom";
import DefaultMessage from "../../js/errors/errorDefault";


export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
       //logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (      
          <DefaultMessage></DefaultMessage>
      );
      }
      return this.props.children;
    }
  }