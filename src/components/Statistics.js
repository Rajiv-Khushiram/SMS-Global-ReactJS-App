import React, { useState, useContext, useEffect } from "react";
import Crypto from "crypto-js";
import { notification, Icon, Table, Spin, Tag, Alert } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { SmsContext } from "../App";
import Navigation from "./Navigation";
import styled from "styled-components";

const LinkWrapper = styled(Link)`
margin-top:100px;
position:relative;
top: 20px;
`;


const Wrapper = styled.div`
  position:relative;
  margin: 20px auto;
  text-align:center;
`

const ErrorWrapper = styled.div`
  position:relative;
  margin: 20px auto;
  text-align:center;
  max-width:400px;
  font-size:32px;
`


const Statistics = () => {
  const contextVal = useContext(SmsContext);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [messages, setMessages] = useState([]);
  const method = "GET";
  const host = "api.smsglobal.com";
  const uri = "/v2/sms/";

  const apiKey = contextVal.state.apiKeyPublic;
  const secretKey = contextVal.state.secretKey;

  useEffect(() => {
    async function getSMS() {
      const getAuthorizationHeader = () => {
        const ts = Math.floor(new Date().getTime() / 1000);
        const nonce = Math.floor(Math.random() * 1e16);

        const signature = [ts, nonce, method, uri, host, 80];
        const macString = `${signature.join(`\n`)}\n\n`;
        const macHash = Crypto.HmacSHA256(macString, secretKey);
        const macBase64 = Crypto.enc.Base64.stringify(macHash);

        return `MAC id="${apiKey}", ts="${ts}", nonce="${nonce}", mac="${macBase64}"`;
      };

      const authorizationHeader = getAuthorizationHeader();
      const headers = "";
      const data = {};

      return axios({
        url: `http://${host}${uri}`,
        method,
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authorizationHeader,
          ...headers
        }
      })
        .then(res => {
          notification.success({
            message: `Messages Fetched`,
            description:` 👍 Good Job, You keys are correct`
          });
          setMessages(res.data.messages);



          setTimeout(function() {
            setLoading(true);
          }, 200);
          return res.data;
        })
        .catch(async function(error) {
          notification.error({
            message: `Incorrect key/s`
            // ${error.response.status}, ${
            //   error.response.data
            // }, ${JSON.stringify(error.response.headers)}`
          });
          setTimeout(function() {
            setLoading(false);
            setError(true);
          }, 1000);
        });
    }

    if (!!apiKey && !!secretKey) {
      getSMS();
    } else {
    }
  }, [apiKey, secretKey]);

  const antIcon = <Icon type="loading" style={{ fontSize: 42 }} spin />;

  const columns = [
    {
      title: "Time Sent",
      dataIndex: "dateTime",
      key: "dateTime"
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: message => <span>{message.substring(0, 60)}</span>
    },
    {
      title: "From",
      dataIndex: "origin",
      key: "origin"
    },
    {
      title: "To",
      dataIndex: "destination",
      key: "destination"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => (
        <span>
          <Tag color="green" key={status}>
            {status.toUpperCase()}
          </Tag>
        </span>
      )
    }
  ];

  return (
    <div>
      <Navigation />
      {!apiKey && !secretKey ? (
        <Wrapper>
        <h1>Store your API keys First</h1>
        </Wrapper>
      ) : (
        <Wrapper>
          {loading && messages.length > 1 ? (
            <Table columns={columns} dataSource={messages} rowKey="id" />
          ) : (
            <React.Fragment>
              {error ? (
                <ErrorWrapper>
                  <Alert message="Incorrect API Keys" type="error" showIcon />
                  <LinkWrapper to="/store-api"> <span role="img" aria-label="perservering">😣</span> Change API Keys</LinkWrapper>
                </ErrorWrapper>
              ) : (
                <Spin indicator={antIcon} />
              )}
            </React.Fragment>
          )}
        </Wrapper>
      )}
    </div>
  );
};

export default Statistics;
