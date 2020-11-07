import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { IFResponse } from '../types';
import { Table } from 'antd';

const TableComponent = () => {
  const [list, setList] = useState<IFResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    Axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        per_page: 50,
        page: currentPage,
      },
    })
      .then((response) => {
        setList(response.data);
      })
      .catch((err) => console.log('Error', err));
  }, []);

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Max supply',
      dataIndex: 'max_supply',
      key: 'max_supply',
    },
  ];

  return (
    <Table dataSource={list} columns={columns} pagination={{ total: 50 }} />
  );
};

export default TableComponent;
