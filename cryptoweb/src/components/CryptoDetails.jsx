import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltFilled,
  CheckOutlined,
} from "@ant-design/icons";

import { useGetCryptoDetailsQuery} from "../services/cryptoAPI";
const { Title, Text } = Typography;
const { Option } = Select;

export default function CryptoDetails() {
  const { coinID } = useParams();

  const { data, isFetching } = useGetCryptoDetailsQuery(coinID);
  const crypto_Details = data?.data?.coin;
  const Volume = crypto_Details?.['24hVolume']

  if (isFetching) return "Loading...";

  const stats = [
    {
      title: "price to USD",
      value: `${crypto_Details.price && millify(crypto_Details?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: crypto_Details?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `${Volume && millify(Volume)}`,
      icon: <ThunderboltFilled />,
    },
    {
      title: "Market Cap",
      value: `${
        crypto_Details?.marketCap && millify(crypto_Details?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-Time-High(daily-avg)",
      value: `${
        crypto_Details?.allTimeHigh?.price && millify(crypto_Details?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: crypto_Details?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: crypto_Details?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: crypto_Details?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${crypto_Details?.supply?.total && millify(crypto_Details?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${crypto_Details?.supply?.circulating && millify(crypto_Details?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return(
    <Col className="coin-detail-container">
       <Col className="coin-heading-container">
           <Title level={2} className="coin-name">
               {crypto_Details.name} {crypto_Details.slug} Price
           </Title>
           <p>
               {crypto_Details.name} live price in us dollars.
               view value statistics, market cap and supply.
           </p>
       </Col>
       
       <Col className="stats-container">
           <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                  <Title level={3} className="coin-detals-heading">
                     {crypto_Details.name} value Statistics
                  </Title>
                  <p>
                    An overview showing the stats of {crypto_Details.name}
                  </p>
              </Col>
              {stats.map(({icon,title,value})=>(
                <Col className="coin-stats">
                   <Col className="coin-stats-name">
                       <Text>{icon}</Text>
                       <Text>{title}</Text>
                   </Col>
                       <Text className="stats">{value}</Text>
                </Col>
              ))}
           </Col>
           <Col className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                  <Title level={3} className="coin-details-heading">
                     Other Statistics
                  </Title>
                  <p>
                    An overview showing the stats of All cryptocurrencies.
                  </p>
              </Col>
              {genericStats.map(({icon,title,value})=>(
                <Col className="coin-stats">
                   <Col className="coin-stats-name">
                       <Text>{icon}</Text>
                       <Text>{title}</Text>
                   </Col>
                       <Text className="stats">{value}</Text>
                </Col>
              ))}
           </Col>
       </Col>
       <Col className="coin-desc-links">
          <Row className="coin-desk">
             <Title level={3} className="coin-details-heading">
                  What is {crypto_Details.name}<br/><br/>
                  {HTMLReactParser(crypto_Details.description)}
             </Title>
          </Row>
          <Col className="coin-links">
              <Title level={3} className="coins-details-heading">
                {crypto_Details.name} Links
              </Title>
              {crypto_Details.links.map((link)=>(
                <Row className="coin-link" key={link.name}>
                   <Title level={5} className="link-name">
                    {link.type}
                   </Title>
                   <a href = {link.url} target="_blank" rel="noprefer">
                      {link.name}
                   </a>
                </Row>
              ))}
          </Col>
       </Col>
    </Col>
  )


}
