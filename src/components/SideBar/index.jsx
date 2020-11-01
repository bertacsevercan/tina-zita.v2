import React from "react";
import "../SideBar/index.css";
import { Layout, Menu} from 'antd';
import { DropboxOutlined, UserOutlined, ShopOutlined, BookOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import {Link}  from "react-router-dom";
import Logout from "../../containers/Logout"
import { useTranslation } from 'react-i18next';
import ar from '../../assests/flags/arabic.png';
import en from '../../assests/flags/english.png';
import tr from '../../assests/flags/turkish.png';


const { Sider } = Layout;
const { SubMenu } = Menu;

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
    
    const TrIcon = () => <img  style={{width:'1.5rem', marginRight:"0.5em" }} src={tr} />
    const EnIcon = () => <img  style={{width:'1.5rem', marginRight:"0.5em" }}  src={en} />
    const ArIcon = () => <img  style={{width:'1.5rem', marginRight:"0.5em" }}  src={ar} />

    
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
          <SubMenu key="sub1" icon={<GlobalOutlined />} title={t("links.language.header0")}>
              <Menu.Item icon={<TrIcon />} onClick={() => {selectLanguage('tr');}} key="5">{t("links.language.header1")}</Menu.Item>
              <Menu.Item icon={<EnIcon />} onClick={() => {selectLanguage('en');}} key="6">{t("links.language.header2")}</Menu.Item>
              <Menu.Item icon={<ArIcon />} onClick={() => {selectLanguage('ar');}} key="7">{t("links.language.header3")}</Menu.Item>
            </SubMenu>
          <Menu.Item key="8" icon={<LogoutOutlined />}>
            <Logout />
          </Menu.Item>
        </Menu>
          </Sider>
    )
}
export default  SideBar;
