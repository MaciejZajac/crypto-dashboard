import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const CustomHeader = () => {
  const [current, setCurrent] = useState<string>('mail');
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        onClick={handleClick}
        selectedKeys={[current]}
        mode='horizontal'
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        <Menu.Item key='mail' icon={<MailOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default CustomHeader;
