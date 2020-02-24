import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkWrapper = styled(Link)`
padding: 0 20px;
`

const NavWrapper = styled.div`
  display: block;
`;

const Navigation = () => {
  return (
    <NavWrapper>
      <LinkWrapper to="/store-api">
        API Details
      </LinkWrapper>
      <LinkWrapper to="/new-sms">
        Send Message
      </LinkWrapper>
      <LinkWrapper to="/statistics" >
        Reporting
      </LinkWrapper>
    </NavWrapper>
  );
};

export default Navigation;
