import React, { useState } from 'react'
import { Select,Typography,Row,Col,Avatar,Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoAPI';

const {Text,Title} = Typography;
const {Option} = Select;
export default function News({simplified}) {

  const {data : cryptoNews,isFetching} = useGetCryptoNewsQuery();
  // console.log(cryptoNews.data.length);
  const [newsCategory , setNewsCategory] = useState('cryptocurrecy')


  const{data} = useGetCryptosQuery(100);

  if(!cryptoNews?.data)return 'Loading...'
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
            <Select 
               showSearch
               className='select-news'
               placeholder = 'Select a Crypto'
               optionFilterProp='children'
               onChange={(value)=>setNewsCategory(value)}
               filterOption= {(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
            >
              <Option value = 'Cryptocurrency'>Cryptocurrency</Option>
              {data?.data?.coins.map((coin)=><Option value = {coin.name}>{coin.name} </Option>)}
            </Select>
        </Col>
      )}
      {cryptoNews.data?.map((news,i)=>(
      
        <Col xs = {24} sm = {12} lg = {8} key = {i}>
          
          <Card hoverable className='news-card'>
            <a href={news.url} target='blank' rel='norefrence'>
               <div className='news-image-container'>
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img src={news?.thumbnail} alt = 'news'/>
               </div>
               <p>
                  {news?.description.length> 100
                  ? `${news.description.substring(0,100)}...`
                  :  news.description
                  }
               </p>
                <p>
                  {news.createdAt}
                </p>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
