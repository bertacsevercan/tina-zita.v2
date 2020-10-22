import React from "react";
import "../SideBar/index.css";
import { Layout, Menu } from 'antd';
import { DropboxOutlined, UserOutlined, ShopOutlined, BookOutlined,LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import {Link, Redirect}  from "react-router-dom";
const { Sider } = Layout;

const SideBar = () => {
    return(
         <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
         
        <div className="logo" >
            Tina-Zita
        </div>
          
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link  exact to="/" >Admin Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DropboxOutlined />}>
            <Link   to="/inventory" >Inventory</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShopOutlined />}>
            <Link to="/order" >Order</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BookOutlined />}>
            <Link to="/recipe" >Recipe</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LoginOutlined />}>
            <Link to="/login" >Log In</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            <Link to="/home" >Log Out</Link>
          </Menu.Item>
        </Menu>
      </Sider>
        
    )
}

export default  SideBar;