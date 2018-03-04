import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Router, Switch, NavLink, Redirect } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import Navigation from '../../components/Navigation/Navigation';
import Databoard from '../../components/Databoard/Databoard';
import SideBar from '../../components/SideBar/SideBar';

class MyLayout extends Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Navigation />
        <Layout style={{ height: '100%' }}>
          <SideBar />
          <Layout
            style={{
              height: '100%',
              padding: '0 24px 24px',
            }}
          >
            <Databoard />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
