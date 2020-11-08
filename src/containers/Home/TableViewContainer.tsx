import { Col, Row, Typography } from 'antd';
import React from 'react';
import TableComponent from '../../components/TableComponent';

const TableViewContainer = () => {
  return (
    <>
      <Row style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Col xl={12}>
          <Typography.Title>CoinGecko API cryptoDashbord</Typography.Title>
        </Col>
      </Row>
      {/* <Typography.Text>Lorem ipsum</Typography.Text> */}
      <TableComponent />
    </>
  );
};

export default TableViewContainer;
