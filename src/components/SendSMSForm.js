import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Icon } from "antd";
import Navigation from "./Navigation";
import { SmsContext } from "../App";
import styled from "styled-components";

const { TextArea } = Input;

const KeysWrapper = styled.div`
  margin: 20px;
`;

const SendSMSForm = (props) => {
  const contextVal = useContext(SmsContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [textInput, setTextInput] = useState("");

  if (!contextVal.state.apiKeyPublic || !contextVal.state.secretKey) {
    // return <Redirect to="/store-api" />
    return (
      <React.Fragment>
        <Navigation/>
        <h1>To send a message you need to store your API keys.</h1>
      </React.Fragment>
    );
  }
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();

    if(textInput.length > 160 )
    {
        const blockArray = textInput.match(/.{1,153}/g);
        alert("message will be sent in parts")
    }
  };
  return (
    <React.Fragment>
      <Navigation />
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
          >
            Send SMS
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Form.create()(SendSMSForm);
