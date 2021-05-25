import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import { render } from "react-dom";
import Carousel1 from "./App";
import NotFoundPage from "./tsx/errors/404";
import CallForm from "./js/accounts/formIdentify";
import MessageBlackList from "./tsx/errors/blackListMessage";
import MessageLimitTry  from "./js/errors/limitEnterMessage";
import AccountLimit  from "./js/errors/limitAccountMessage";
import MistakesQuestions  from "./js/errors/mistakesInQuestions";
import DefaultMessage  from "./js/errors/errorDefault";
import Register from './js/accounts/firstStep';
import RegisterSC2 from './js/accounts/secondStepC';
import RegisterF2C from './js/accounts/firstStepEnter';
import RegisterSC3 from './js/accounts/thirdStep';
import SummaryAccount from './js/accounts/LastStepC';
import QuestionsView from './js/accounts/questions';
import RegisterClientView from './js/accounts/registerClient';
import QuestionsClientView from './js/accounts/questionsClient' ;
import RegisterTNC3 from './js/accounts/thirdStepNC' ;
import RegisterFNC4 from './js/accounts/fourthStepNC' ;
import ErrorBoundary from './js/errors/errorBoundary';
import IdentifyLoanForm from './js/loan/formIdentify';
import RegisterLoan from './js/loan/firstStep';
import RegisterF2Loan from './js/loan/firstStepEnter.js';
import QuestionsClientLoanView from './js/loan/questions.js';
import RegisterS2Loan from './js/loan/secondStep.js'
import ThirdStepLoan from './js/loan/thirdStep.js';
import RegisterS4 from './js/loan/fourthStep.js';
import LeadInProcessMessage from './js/errors/leadInProcess.js';
import NoLeadsMessage from './js/errors/noLeads.js';
import NoClientMessage from './js/errors/noLoanForNoClient.js';
import RegisterS5 from './js/loan/fifthStep.js';
import RegisterS6 from './js/loan/sixthStep.js';
import TermsAndConditionsPage from './js/T&C.js';
import QuestionsInformation from './js/accounts/questionsInformation.js';
import QuestionsInformationNC from './js/accounts/questionsInformationNC.js';

const App = () => (
      <Router>
        <Switch>
          <ErrorBoundary>
          <Route exact path="/" component={Carousel1}/>
          <Route exact path="/404" component={NotFoundPage}/>
          <Route  path="/Identifyform" component={CallForm}/>          
          <Route  path="/FirstStep" component={Register} />
          <Route  path="/FirstStepEnter" component={RegisterF2C} />
          <Route  path="/SecondStep" component={RegisterSC2} />
          <Route  path="/ThirdStep" component={RegisterSC3} />
          <Route  path="/LastStep" component={SummaryAccount} />
          <Route  path="/Questions" component={QuestionsView} />
          <Route  path="/QuestionsClient" component={QuestionsClientView} />
          <Route  path="/RegisterClient" component={RegisterClientView} />    
          <Route  path="/ThirdStepNC" component={RegisterTNC3} />
          <Route  path="/FourthStepNC" component={RegisterFNC4} />   
          <Route  path="/ErrorMessage" component ={DefaultMessage}/>  
          <Route  path="/BlackListMessage" component={MessageBlackList}/>
          <Route  path="/LimitTryMessage" component ={MessageLimitTry}/>
          <Route  path="/LimitAccountMessage" component ={AccountLimit}/>
          <Route  path="/InvalidAnswersMessage" component ={MistakesQuestions}/>
          <Route  path="/LoanInProcessMessage" component ={LeadInProcessMessage}/>
          <Route  path="/NoLeadsMessage" component ={NoLeadsMessage}/>
          <Route  path="/NoClientMessage" component ={NoClientMessage}/>
          <Route  path="/IdentifyLoanform" component ={IdentifyLoanForm} />
          <Route  path="/FirstStepLoan" component ={RegisterLoan}/> 
          <Route  path="/FirstStepEnterLoan" component ={RegisterF2Loan}/> 
          <Route  path="/QuestionsClientLoan" component={QuestionsClientLoanView}/>
          <Route  path="/SecondStepLoan" component={RegisterS2Loan}/>
          <Route  path="/ThirdStepLoan" component={ThirdStepLoan}/>
          <Route  path="/FourthStepLoan" component={RegisterS4}/>
          <Route  path="/FifthStepLoan" component={RegisterS5}/>
          <Route  path="/SixthStepLoan" component={RegisterS6}/>
          <Route path="/TermsandCondition" component = {TermsAndConditionsPage}/>
          <Route path="/QuestionsInformationC" component = {QuestionsInformation}/> 
          <Route path="/QuestionsInformationNC" component = {QuestionsInformationNC}/>
          </ErrorBoundary>
          <Redirect to="/"/>
        </Switch>
      </Router>
);

render(<App />, document.getElementById("root"));