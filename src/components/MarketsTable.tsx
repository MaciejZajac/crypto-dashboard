import React from 'react';
import { Avatar, Space, Table, Typography } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

interface ITableComponent {
  params: {
    tableData: any[];
    loading: boolean;
    handleTableChange: (pagination: TablePaginationConfig) => void;
  };
}

const MarketsTable = ({ params }: ITableComponent) => {
  const { tableData, loading, handleTableChange } = params;
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
          <Link to={`/coins/${row.id}`}>
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

export default MarketsTable;
