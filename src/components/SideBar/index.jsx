import React from "react";
import "../SideBar/index.css";
import { Layout, Menu } from 'antd';
import { DropboxOutlined, UserOutlined, ShopOutlined, BookOutlined,LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import {Link}  from "react-router-dom";
import Logout from "../../containers/Logout"
import Login from "../../containers/Login";
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
            MY Inventory
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
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            <Logout />
          </Menu.Item>
        </Menu>
      </Sider>
        
    )
}

export default  SideBar;