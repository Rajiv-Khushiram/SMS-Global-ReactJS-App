import React, { useState, useContext } from "react";
import { Form, Input, Button, notification, Icon } from "antd";
import "antd/dist/antd.css";
import { SmsContext } from "../App";
import Navigation from "./Navigation";
import styled from "styled-components";

const Wrapper = styled.div`
  display:flex;
  position:relative;
  margin: 0 auto;
  justify-content: center;
`;

const CustomForm = styled(Form)`
min-width: 300px;
`;

const CustomFormItem = styled(Form.Item)`
margin-bottom: 0px;
`;


const StoreAPIKeys = props => {
  const context = useContext(SmsContext);
  const [publicKey, setPub] = useState(context.state.apiKeyPublic);
  const [secretKey, setSecret] = useState(context.state.secretKey);
  const [brandName, setBrandName] = useState(context.state.brandName)

  const submitNotifications = () => {
    notification.success({
      message: `✔ Key saved`
    });
    // setTimeout(function() {
    //   notification.warning({
    //     message: `Refresh your browser to clear your keys `
    //   });
    // }, 1000);
  };

  const submitForm = e => {
    e.preventDefault();
    context.state.updateKeyPublic(publicKey);
    context.state.updateSecretKey(secretKey);
    // context.state.updateDisplayName(displayName);
    context.state.updateBrandName(brandName);
    submitNotifications();
  };

  const { getFieldDecorator } = props.form;

  
  return (
    <React.Fragment>
      <Navigation />
      <Wrapper>
        <CustomForm onSubmit={submitForm} className="login-form">
          <CustomFormItem style={{}} label="Public Key" value>
            {getFieldDecorator("publicKey", {
              rules: [
                { required: true, message: "Remember to fill in the title" },
                { whitespace: true, message: "Remember to fill in the title" }
              ],
              initialValue: publicKey 
            })(
              <Input
                required
                prefix={<Icon type="key" style={{ width: "50%" }} />}
                placeholder="..."
                onChange={e => {
                  setPub(e.target.value);
                }}
              />
            )}
          </CustomFormItem>
          <CustomFormItem label="Secret Key">
            {getFieldDecorator("secretKey", {
              rules: [
                { required: true, message: "Remember to fill in the title" },
                { whitespace: true, message: "Remember to fill in the title" }
              ],
              initialValue: secretKey
            })(
              <Input
                required
                prefix={<Icon type="lock" style={{ width: "50%" }} />}
                type="password"
                placeholder="..."
                onChange={e => {
                  setSecret(e.target.value);
                }}
              />
            )}
          </CustomFormItem>
          <CustomFormItem label="API Name:">
            {getFieldDecorator("brandName", {
              rules: [  
              ],
              initialValue: brandName
            })(
              <Input
                required
                prefix={<Icon type="user" style={{ width: "50%" }} />}
                placeholder="Name"
                onChange={e => {
                  setBrandName(e.target.value);
                }}     
              />
            )}
          </CustomFormItem>
          <Button
            style={{ "float": "right", "top":" 10px" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Save
          </Button>
        </CustomForm>
      </Wrapper>
    </React.Fragment>
  );
};

export default Form.create()(StoreAPIKeys);
