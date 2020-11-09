import React, { useState, useEffect } from 'react';
import MarketsTable from '../../components/MarketsTable';
import { Col, Row, Typography } from 'antd';
import { IFResponse } from '../../types';
import Axios from 'axios';
import { TablePaginationConfig } from 'antd/lib/table';

enum Currency {
  USD = 'usd',
  EUR = 'eur',
}

interface IDataParams {
  vs_currency: Currency;
  ids?: string;
  category?: string; // 'decentralized_finance_defi'
  order?: string; //  market_cap_desc, gecko_desc, gecko_asc, market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
  per_page: number; // 1 - 250
  page: number;
  sparkline?: boolean; // gives huge array with points
  price_change_percentage?: string; // 1h, 24h, 7d, 14d, 30d, 200d, 1y
  total: 200;
}

const defaultParams: IDataParams = {
  vs_currency: Currency.EUR,
  per_page: 10,
  page: 1,
  total: 200,
};

const MarketsViewContainer = () => {
  const [dataParams, setDataParams] = useState<IDataParams>(defaultParams);
  const [tableData, setTableData] = useState<IFResponse[]>([]);
  const [pagination, setPagination] = useState<any>({
    currentPage: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getTableData({ params: dataParams });
  }, [dataParams]);

  const getTableData = ({ params }: { params: IDataParams }) => {
    setLoading(true);
    Axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params,
    })
      .then((response) => {
        console.log('response.data', response.data);
        setTableData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('error:', err);
      });
  };

  const handleTableChange = (pag: TablePaginationConfig) => {
    setPagination({
      ...pagination,
      pageSize: pag.pageSize,
      currentPage: pag.current,
    });

    const params: IDataParams = {
      ...dataParams,
      per_page: pag.pageSize || 10,
      page: pag.current || 1,
    };

    setDataParams(params);
  };

  return (
    <>
      <Row>
        <Col xl={12}>
          {/* <Typography.Text>Lorem ipsum</Typography.Text> */}
          <Typography.Title>CoinGecko API cryptoDashbord</Typography.Title>
        </Col>
      </Row>
      <MarketsTable params={{ tableData, loading, handleTableChange }} />
    </>
  );
};

export default MarketsViewContainer;
