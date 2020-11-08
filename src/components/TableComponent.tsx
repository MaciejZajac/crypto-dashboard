import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { IFResponse } from '../types';
import { Avatar, Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { EOF } from 'dns';
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
  sparkline?: boolean;
  price_change_percentage?: string; // 1h, 24h, 7d, 14d, 30d, 200d, 1y
  total: 200;
}

const defaultParams: IDataParams = {
  vs_currency: Currency.EUR,
  per_page: 10,
  page: 1,
  total: 200,
};

const TableComponent = () => {
  const [dataParams, setDataParams] = useState<IDataParams>(defaultParams);
  const [tableData, setTableData] = useState<IFResponse[]>([]);
  const [pagination, setPagination] = useState<any>({
    currentPage: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getTableData({ params: dataParams });
  }, []);

  const getTableData = ({ params }: { params: IDataParams }) => {
    setLoading(true);
    Axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params,
    })
      .then((response) => {
        setTableData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('error:', err);
      });
  };

  const handleTableChange = (
    pag: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
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

    getTableData({ params });
  };

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string) => <Link to={`/${text}`}>{text}</Link>,
    },
    {
      title: '24H cap change',
      dataIndex: 'market_cap_change_percentage_24h',
      key: 'market_cap_change_percentage_24h',
      width: '20%',
    },
    {
      title: '24H change',
      dataIndex: 'price_change_24h',
      key: 'price_change_24h',
      width: '20%',
    },
    {
      title: 'Max supply',
      dataIndex: 'max_supply',
      key: 'max_supply',
      width: '20%',
    },
  ];

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={{ total: 50, showSizeChanger: true }}
      loading={loading}
      onChange={handleTableChange}
      style={{ maxWidth: '1400px', margin: '0 auto' }}
    />
  );
};

export default TableComponent;
