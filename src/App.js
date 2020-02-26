import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";

import SendSMSForm from "./components/SendSMSForm"
import Statistics from "./components/Statistics"
import StoreAPIKeys from "./components/StoreAPIKeys"

export const SmsContext = React.createContext();


const SmsContextProvider = (props) => {
  const [apiKeyPublic, setapiKeyPublic] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [displayName, setDisplayName] = useState("");

  let state = {
    apiKeyPublic,
    secretKey,
    displayName,
    updateKeyPublic: (currentTarget) => { setapiKeyPublic(currentTarget)},
    updateSecretKey: (currentTarget) => { setSecretKey(currentTarget)},
    updateDisplayName: (currentTarget) => { setDisplayName(currentTarget)}
  }
  return (
    <SmsContext.Provider value={{state:state}}>
      {props.children}
    </SmsContext.Provider>
  )
}

const App = () => {
  return (
    <div className="App">
      <SmsContextProvider>
       <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Navigation}/>  
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/new-sms" component={SendSMSForm} />
          <Route exact path="/store-api" component={StoreAPIKeys}/>

          </Switch>
      </BrowserRouter>
      </SmsContextProvider>
    </div>
  );
};

export default App;
