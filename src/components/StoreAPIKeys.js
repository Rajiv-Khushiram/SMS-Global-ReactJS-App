import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import "antd/dist/antd.css";
import { SmsContext } from "../App";
import Navigation from "./Navigation";

const StoreAPIKeys = props => {
  const context = useContext(SmsContext);
  const [publicKey, setPub] = useState(context.state.apiKeyPublic);
  const [secretKey, setSecret] = useState(context.state.secretKey);
  const [displayName, setdisplayName] = useState(context.state.displayName);


  const openNotification = placement => {
    notification.info({
      message: `Notification`,
      description:
        'Well done! Keys Saved!  ',
      placement,
    });
  };

  const submitForm = e => {
    e.preventDefault();
    context.state.updateKeyPublic(publicKey);
    context.state.updateSecretKey(secretKey);
    context.state.updateDisplayName(displayName);
    openNotification('topRight')
  };

  const { getFieldDecorator } = props.form;

  return (
    <React.Fragment>
      <Navigation />
      
      <Form onSubmit={submitForm} className="login-form">
  
        <Form.Item>
          PublicKey
          {getFieldDecorator("publicKey", {
            rules: [
              {
                required: true,
              }
            ]
          })(
            <Input
              required
              placeholder={publicKey}
              onChange={e => {
                setPub(e.target.value);
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          Secret Key
          {getFieldDecorator("secretKey", {
            rules: [
              {
                required: true,
              }
            ]
          })(
            <Input
              required
              placeholder={secretKey}
              onChange={e => {
                setSecret(e.target.value);
              }}

            />
          )}
        </Form.Item>
        <Form.Item>
          Name:
          {getFieldDecorator("displayName", {
            rules: [
              {
                required: true,
              }
            ]
          })(
            <Input
              required
              placeholder={displayName}
              onChange={e => {
                setdisplayName(e.target.value);
              }}

            />
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Save Details 
        </Button>
      </Form>
     
    </React.Fragment>
  );
};

export default Form.create()(StoreAPIKeys);
