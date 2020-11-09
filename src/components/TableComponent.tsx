import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { IFResponse } from '../types';
import { Avatar, Space, Table, Typography } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

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

    setDataParams(params);
  };

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'market_cap_rank',
      key: 'market_cap_rank',
      width: '60px',
    },
    {
      title: 'Name',
      dataIndex: 'image',
      key: 'image',
      render: (image: string, row: any) => {
        return (
          <Link to={`/${row.id}`}>
            <Space size={14}>
              <Avatar src={image} icon={<UserOutlined />} />
              <Typography.Text>{row.name}</Typography.Text>
            </Space>
          </Link>
        );
      },
    },
    {
      title: '24H cap change',
      dataIndex: 'market_cap_change_percentage_24h',
      key: 'market_cap_change_percentage_24h',
    },
    {
      title: '24H change',
      dataIndex: 'price_change_24h',
      key: 'price_change_24h',
    },
    {
      title: 'Volume',
      dataIndex: 'total_volume',
      key: 'total_volume',
    },
  ];

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={{ total: 200, showSizeChanger: true }}
      loading={loading}
      onChange={handleTableChange}
      style={{ maxWidth: '1400px', margin: '0 auto' }}
    />
  );
};

export default TableComponent;
