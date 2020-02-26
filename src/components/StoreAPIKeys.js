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
    notification.success({
      message: `✔ Key saved`,
      placement
    });
    setTimeout(function(){ 
      notification.warning({
        message: `If you refresh your browser, your keys will be cleared `,
        placement
      });
     }, 1000);
  };

  const submitForm = e => {
    e.preventDefault();
    context.state.updateKeyPublic(publicKey);
    context.state.updateSecretKey(secretKey);
    context.state.updateDisplayName(displayName);
    openNotification("topRight");
  };

  const { getFieldDecorator } = props.form;

  return (
    <React.Fragment>
      <Navigation />

      <Form onSubmit={submitForm}  className="login-form">
        <Form.Item value >
        <Input
          required
          placeholder="Public Key"
          onChange={e => {
            setPub(e.target.value);
          }}
          value={publicKey}
          
        />
        </Form.Item>
        <Form.Item>
          <Input
            required
            placeholder="Secret Key"
            onChange={e => {
              setSecret(e.target.value);
            }}
            value={secretKey}
          />
        </Form.Item>
        <Form.Item>
          <Input
            required
            placeholder="Name"
            onChange={e => {
              setdisplayName(e.target.value);
            }}
            value={displayName}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Save Details
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Form.create()(StoreAPIKeys);
