import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const CustomHeader = () => {
  const [current, setCurrent] = useState<string>('mail');
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Header style={{ background: '#fff', height: '65px' }}>
      <div className='logo' />
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode='horizontal'
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        <Menu.Item key='crypto'>
          <Link to='/'>CryptoDashboard</Link>
        </Menu.Item>
        <Menu.Item key='markets'>
          <Link to='/exchanges'>Markets</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default CustomHeader;
