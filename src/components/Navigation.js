import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Breadcrumb } from "antd";
import "antd/dist/antd.css";

const LinkWrapper = styled(Link)`
margin: 0 10px;

`

const NavWrapper = styled.div`
  display: block;
  text-align:center;
  margin: 20px 10px;
  position:relative;
`;

const Navigation = () => {
  return (
    <NavWrapper>
     <Breadcrumb separator="">
    <Breadcrumb.Item><LinkWrapper to="/store-api">
        API Keys Settings 
      </LinkWrapper></Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>      <LinkWrapper to="/statistics" >
        Report  
      </LinkWrapper></Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item><LinkWrapper to="/new-sms">
        SMS
      </LinkWrapper></Breadcrumb.Item>
    </Breadcrumb>
      {/* <LinkWrapper to="/store-api">
        API Keys Settings  { " " } |
      </LinkWrapper>
      <LinkWrapper to="/statistics" >
        Report   { " " }|
      </LinkWrapper>
      <LinkWrapper to="/new-sms">
        SMS { " " }
      </LinkWrapper> */}

    </NavWrapper>
  );
};

export default Navigation;
