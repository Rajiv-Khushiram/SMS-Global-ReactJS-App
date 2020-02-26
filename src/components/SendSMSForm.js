import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Crypto from 'crypto-js';
import { Form, Input, Button, Icon, notification } from "antd";
import Navigation from "./Navigation";
import { SmsContext } from "../App";
import styled from "styled-components";

const { TextArea } = Input;

const KeysWrapper = styled.div`
  margin: 20px;
`;

const SendSMSForm = props => {
  const contextVal = useContext(SmsContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);

  const [textInput, setTextInput] = useState("");

  const { getFieldDecorator } = props.form;
  const method ='POST'
  const host = 'api.smsglobal.com';
  const uri ='/v2/sms/'
  const  apiKey  = ""
  const  apiSecret = ""

  async function getUsers() {
   return axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const persons = res.data;
      notification.success({
        message: `USERS FETCHED `
      })
      console.log(persons)
      setTimeout(function(){ setLoading(false); }, 1000);
      return res.data;
    })
    .catch(async function (error) {
      notification.error({
        message: `USERS NOT FETCHED  ${error.response.status}, ${error.response.data}, ${JSON.stringify(error.response.headers)}`
      })
      setTimeout(function(){ setLoading(false); }, 1000);
      console.log(error.response.headers)
    })
  }

  const getAuthorizationHeader = () => {

    const ts = Math.floor(new Date().getTime() / 1000);
    const nonce = Math.floor(Math.random() * 1e16);

    const signature = [ts, nonce, method, uri, host, 80];
    const macString = `${signature.join(`\n`)}\n\n`;
    const macHash = Crypto.HmacSHA256(macString, apiSecret);
    const macBase64 = Crypto.enc.Base64.stringify(macHash);

    return `MAC id="${apiKey}", ts="${ts}", nonce="${nonce}", mac="${macBase64}"`;
  };

  async function postSMS() {

    const authorizationHeader = getAuthorizationHeader();
    const headers =""
    const data = { message:textInput, origin:from, destination:to }

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
       const persons = res.data;
       notification.success({
         message: `${JSON.stringify(res)} `
       })
       console.log(persons)
       setTimeout(function(){ setLoading(false); }, 1000);
       return res.data;
     })
     .catch(async function (error) {
       notification.error({
         message: `USERS NOT FETCHED  ${error.response.status}, ${error.response.data}, ${JSON.stringify(error.response.headers)}`
       })
       setTimeout(function(){ setLoading(false); }, 1000);
       console.log(error.response.headers)
     })
   }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (textInput.length > 160) {
      const blockArray = textInput.match(/.{1,153}/g);

      alert("message will be sent in parts");
    }
    await postSMS()

    // if (await getUsers().length) {
    // notification.error({
    //   message: `API NOT FETCHED `
    // })}
    // else {
    //   notification.success({
    //     message: `Success fetched`
    //   })
    // }
  };



  return (
    <React.Fragment>
      <Navigation />
      {!contextVal.state.apiKeyPublic || !contextVal.state.secretKey ? (
        <h1>To send a message you need to store your API keys.</h1>
      ) : (
        <Form onSubmit={handleSubmit} className="login-form">
          <SmsContext.Consumer>
            {context => (
              <KeysWrapper>
                <p>Name: {context.state.displayName}</p>
                Public Key: {context.state.apiKeyPublic}
                {",  "}
                Secret Key: {context.state.secretKey}
              </KeysWrapper>
            )}
          </SmsContext.Consumer>
          To:
          <Form.Item>
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
                placeholder="Recipient number"
                onChange={e => setTo(e.target.value)}
              />
            )}
          </Form.Item>
          From:
          <Form.Item>
            {getFieldDecorator("from", {
              rules: [
                {
                  required: true,
                  message: "Please input the senders phone number!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Sender number"
                onChange={e => setFrom(e.target.value)}
              />
            )}
          </Form.Item>
          Message Input:
          <Form.Item>
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
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={()=>setLoading(true)}
              loading={loading}
            >
              
              Send SMS
            </Button>
          </Form.Item>
        </Form>
      )}
    </React.Fragment>
  );
};

export default Form.create()(SendSMSForm);
