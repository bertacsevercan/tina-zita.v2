import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import SideBar from "./components/SideBar/index"
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import Admin from "./containers/Admin";
import Order from "./containers/Order";
import Inventory from "./containers/Inventory";
import Recipe from "./containers/Recipe";


const { Header, Footer,Content } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
      <Layout>
        <SideBar/>
      <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        
        <Route exact path="/" component={Admin} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/order" component={Order} />
        <Route path="/recipe" component={Recipe} />
     
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>KardeşlerCoding Design ©2020 Created by KardeşlerCoding</Footer>
    </Layout>
    </Layout>
    </Router>
     
    </div>
  );
}

export default App;
