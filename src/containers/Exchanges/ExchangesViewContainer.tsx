import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ExchangeTable from '../../components/ExchangeTable';
import { TablePaginationConfig } from 'antd/lib/table';

interface IExchange {
  per_page: number;
  page: number;
}

const initialParams: IExchange = {
  per_page: 10,
  page: 1,
};

const ExchangesViewContainer = () => {
  const [dataParams, setDataParams] = useState<any>(initialParams);
  const [tableData, setTableData] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    currentPage: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getExchangeData(dataParams);
  }, [dataParams]);

  const getExchangeData = (params: IExchange) => {
    console.log('params', params);
    setLoading(true);
    Axios.get('https://api.coingecko.com/api/v3/exchanges', {
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

    const params = {
      ...dataParams,
      per_page: pag.pageSize || 10,
      page: pag.current || 1,
    };
    setDataParams(params);
  };

  return (
    <>
      <ExchangeTable params={{ tableData, loading, handleTableChange }} />
    </>
  );
};

export default ExchangesViewContainer;
