import { Layout } from 'antd';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
const { Content, Footer } = Layout;
interface ILayout {
  children: React.ReactChild;
}
const CustomLayout = ({ children }: ILayout) => {
  return (
    <Layout>
      <CustomHeader />
      <Content style={{ padding: '0 50px' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>©2020 Maciej Zając</Footer>
    </Layout>
  );
};

export default CustomLayout;
