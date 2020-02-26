import React, { useContext, useState } from "react";
import axios from "axios";
import Crypto from 'crypto-js';
import { Form, Input, Button, Icon, notification } from "antd";
import Navigation from "./Navigation";
import { SmsContext } from "../App";
import styled from "styled-components";

const { TextArea } = Input;

// const KeysWrapper = styled.div`
//   margin: 20px;
// `;

const CustomForm = styled(Form)`
min-width: 400px;
`;

const Wrapper = styled.div`
  display:flex;
  justify-content: center;
  position:relative;
  margin: 20px auto;
`

const SendSMSForm = props => {
  const contextVal = useContext(SmsContext);
  const [from, setFrom] = useState(contextVal.state.displayName)

  // const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const [textInput, setTextInput] = useState("");

  const { getFieldDecorator } = props.form;
  const method ='POST'
  const host = 'api.smsglobal.com';
  const uri ='/v2/sms/'
  const  apiKey  = contextVal.state.apiKeyPublic 
  const secretKey =  contextVal.state.secretKey

  const getAuthorizationHeader = () => {
    const ts = Math.floor(new Date().getTime() / 1000);
    const nonce = Math.floor(Math.random() * 1e16);
  
    const signature = [ts, nonce, method, uri, host, 80];
    const macString = `${signature.join(`\n`)}\n\n`;
    const macHash = Crypto.HmacSHA256(macString, secretKey);
    const macBase64 = Crypto.enc.Base64.stringify(macHash);
  
    return `MAC id="${apiKey}", ts="${ts}", nonce="${nonce}", mac="${macBase64}"`;
  };

  async function postSMS() {
    const authorizationHeader = getAuthorizationHeader();
    const headers =""
    const data = { message:textInput, origin:from, destination:to }
    console.log(data.origin)
    return axios({
      url: `http://${host}${uri}`,
      method,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
        ...headers
      }
    })
    .then(res => {
      //  const messages = res.data;
      //  console.log(messages)
       notification.success({
         message: `Message Sent! `
       })
       setTimeout(function(){ setLoading(false); }, 1000);

       return res.data;
     })
     .catch(async function (error) {
       notification.error({
                 //  ${error.response.status}, ${error.response.data}, ${JSON.stringify(error.response.headers)}
         message: `SMS NOT SENT `,
         description:`Make sure your keys are correct or that you have enough credit`
       })
       setTimeout(function(){ setLoading(false); }, 1000);
      //  console.log(error.response.headers)
     })
   }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (textInput.length > 160) {
      notification.info({
        message: `Message will be sent in multi-parts `
      })
      
    }
    await postSMS()
  };

  return (
    <React.Fragment>
      <Navigation />
      {!contextVal.state.apiKeyPublic || !contextVal.state.secretKey ? (
        <Wrapper><h1>Store your API keys first</h1></Wrapper>
      ) : (
        <Wrapper>
        <CustomForm onSubmit={handleSubmit} className="login-form">
          {/* <SmsContext.Consumer>
            {context => (
              // <KeysWrapper>
              //   <p>Name: {context.state.displayName}</p>
              //   Public Key: {context.state.apiKeyPublic}
              //   {",  "}
              //   Secret Key: {context.state.secretKey}
              // </KeysWrapper>
            )}
          </SmsContext.Consumer> */}
        
        <Form.Item label="From" >
            {getFieldDecorator("from", {
              rules: [
                {
                  required: true,
                  message: "Please input the recipient phone number!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Sender No."
                onChange={e => setFrom(e.target.value)}
              />
            )}
          </Form.Item>  
          <Form.Item label="To" >
            {getFieldDecorator("to", {
              rules: [
                {
                  required: true,
                  message: "Please input the recipient phone number!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Recipient No."
                onChange={e => setTo(e.target.value)}
              />
            )}
          </Form.Item>       
          <Form.Item label="Text:">
            {getFieldDecorator("textInput", {
              rules: [
                {
                  required: true,
                  message: "Please input the senders phone number!"
                }
              ]
            })(
              <TextArea
                autoSize={{
                  minRows: 2,
                  maxRows: 6
                }}
                onChange={e => setTextInput(e.target.value)}
              />
            )}{" "}
          </Form.Item>
          <Form.Item>
            <Button
              style={{"float":"right"}}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={()=>setLoading(true)}
              loading={loading}
            >
              
              Send SMS
            </Button>
          </Form.Item>
        </CustomForm></Wrapper>
      )}
    </React.Fragment>
  );
};

export default Form.create()(SendSMSForm);
