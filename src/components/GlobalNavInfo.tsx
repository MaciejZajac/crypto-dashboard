import { Col, Row, Space } from 'antd';
import React from 'react';

const GlobalNavInfo = ({ data }: any) => {
  return (
    <Row style={{ padding: '15px 5px' }}>
      <Col xl={18} offset={3}>
        <Space size={30}>
          <span>Waluty: {data.active_cryptocurrencies}</span>
          <span>Giełdy: {data.markets}</span>
          <span>
            Dominacja BTC: {data.market_cap_percentage.btc.toFixed(2)}%
          </span>
          <span>
            24H market cap change:{' '}
            {data.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </span>
        </Space>
      </Col>
    </Row>
  );
};
export default GlobalNavInfo;
