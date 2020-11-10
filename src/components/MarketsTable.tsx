import React from 'react';
import { Avatar, Col, Row, Space, Table, Typography } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

interface ITableComponent {
  params: {
    tableData: any[];
    loading: boolean;
    handleTableChange: (pagination: TablePaginationConfig) => void;
  };
}

const MarketsTable = ({ params }: ITableComponent) => {
  const history = useHistory();
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
          <Space size={14}>
            <Avatar src={image} icon={<UserOutlined />} />
            <Typography.Text>{row.name}</Typography.Text>
          </Space>
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
    <Row>
      <Col xl={18} offset={3}>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={{ total: 200, showSizeChanger: true }}
          loading={loading}
          onChange={handleTableChange}
          onRow={(record: any) => {
            return {
              onClick: () => {
                history.push(`/coins/${record.id}`);
              },
            };
          }}
        />
      </Col>
    </Row>
  );
};

export default MarketsTable;
