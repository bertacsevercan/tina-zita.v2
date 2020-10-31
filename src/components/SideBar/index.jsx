import React from "react";
import "../SideBar/index.css";
import { Layout, Menu } from 'antd';
import { DropboxOutlined, UserOutlined, ShopOutlined, BookOutlined,LoginOutlined, LogoutOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import {Link}  from "react-router-dom";
import Logout from "../../containers/Logout"
import Login from "../../containers/Login";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from '../../assests/flags/arabic.png';
import en from '../../assests/flags/english.png';
import tr from '../../assests/flags/turkish.png';

import { Dropdown, Button, message, Tooltip } from 'antd';

const { Sider } = Layout;

const SideBar = () => {

    const [t,i18n] = useTranslation();
    const selectLanguage = (language) => {
      if (language === 'ar') {
        i18n.changeLanguage('ar');
        document.documentElement.style.setProperty('direction', 'rtl'); 
      } else {
        i18n.changeLanguage(language);
        document.documentElement.style.setProperty('direction', 'ltr');
      }
    };
    

    const menu = (
      <Menu>
        <Menu.Item onClick={() => {selectLanguage('tr');}} key="1">
          Turkish
          <img style={{width:'24px', height:'16px', marginLeft:'15px', marginBottom:'5px'}} src={tr} />
        </Menu.Item>
        <Menu.Item onClick={() => {selectLanguage('en');}} key="2">
          English
          <img style={{width:'24px', height:'16px', marginLeft:'15px', marginBottom:'5px'}} src={en} />
        </Menu.Item>
        <Menu.Item onClick={() => {selectLanguage('ar');}} key="3">
          Arabic
          <img style={{width:'24px', height:'16px', marginLeft:'20px', marginBottom:'5px'}} src={ar} />
        </Menu.Item>
      </Menu>
    );
    
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
            M.Y-Inventory
        </div>
          
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link  exact to="/" >{t('links.adminDashboard')}</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DropboxOutlined />}>
            <Link   to="/inventory" >{t('links.inventory')}</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShopOutlined />}>
            <Link to="/order" >{t('links.order')}</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BookOutlined />}>
            <Link to="/recipe" >{t('links.recipe')}</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            <Logout />
          </Menu.Item>
        </Menu>
        <Dropdown overlay={menu}>
          <Button className="langDropdown">
            Language <DownOutlined />
          </Button>
        </Dropdown>
          </Sider>
    )
}
export default  SideBar;


{/* <div className="languageButtons">
        <div className="trBtn">
          <img onClick={() => {selectLanguage('tr');}} style={{width:'48px', height:'25px', cursor:'pointer'}} src={tr} alt="Turkish language" />
        </div>
        <div className="enBtn">
          <img onClick={() => {selectLanguage('en');}} style={{width:'35px', height:'19px'}} src={en} alt="English language" />
        </div>
        <div className="arBtn"> 
          <img onClick={() => {selectLanguage('ar');}} style={{width:'35px', height:'19px'}} src={ar} alt="Arabic language" />
        </div>
        </div> */}