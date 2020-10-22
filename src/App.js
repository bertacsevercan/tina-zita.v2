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
import Home from "./containers/Home";
import Login from './containers/Login';

const { Header, Footer,Content } = Layout;

function App() {
//this is hard coded, change it with context api
  const [isLogged, setLog] = React.useState(true)

  return (
    <div className="App">
      <Router>
       {
         isLogged? (
          <Layout>
          <SideBar/>
        <Layout>
        
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: "88vh" }}>
          
          <Route exact path="/" component={Admin} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/recipe" component={Recipe} />
          
          <Route exact path="/login" component={Login}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>KardeşlerCoding Design ©2020 Created by KardeşlerCoding</Footer>
      </Layout>
      </Layout>
         ) : (
          <Layout>
            <Route exact path="/" component={Home} />
          </Layout>
        ) 
       }
     
    </Router>
     
    </div>
  );
}

export default App;
