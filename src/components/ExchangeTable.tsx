import { Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Table, { TablePaginationConfig } from 'antd/lib/table';
import React from 'react';

interface ITableComponent {
  params: {
    tableData: any[];
    loading: boolean;
    handleTableChange: (pagination: TablePaginationConfig) => void;
  };
}

const ExchangeTable = ({ params }: ITableComponent) => {
  const { tableData, loading, handleTableChange } = params;
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'trust_score_rank',
      key: 'trust_score_rank',
      width: '60px',
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Logo',
      dataIndex: 'image',
      key: 'image',
      width: '60px',
      render: (img: string, row: any) => <Avatar src={img} alt={row.name} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Trust Score',
      dataIndex: 'trust_score',
      key: 'trust_score',
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: '24h BTC trade volume',
      dataIndex: 'trade_volume_24h_btc',
      key: 'trade_volume_24h_btc',
      render: (num: number) => (
        <Typography.Text>{num.toFixed(2)}</Typography.Text>
      ),
    },
    {
      title: 'Adress',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => (
        <a href={text} target='_blank' rel='noreferrer'>
          {text}
        </a>
      ),
    },
  ];
  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={{ total: 100, showSizeChanger: true }}
      loading={loading}
      onChange={handleTableChange}
      style={{ maxWidth: '1400px', margin: '0 auto' }}
    />
  );
};
export default ExchangeTable;
