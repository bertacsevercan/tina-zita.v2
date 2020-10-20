import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig"
import InventoryTable from "../../components/InventoryTable";
import { Typography, Button, Spin } from 'antd';
import "../../containers/Inventory/style.css";

const { Title } = Typography;
const Inventory = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);

    useEffect(()=> {
        const unsubscribe =
        db
        .collection("inventory")
        .onSnapshot((snapshot) => {
          const dataArr = [];
          snapshot.forEach((doc) => {
            dataArr.push({ ...doc.data() });
          });
          setItem(dataArr);
          setLoading(false);
        });
        
      return unsubscribe;
      
    }, []);
    
    return(
        <div>

       
        <Title level={3}>Inventory</Title>
       
        <Button className="button" type="primary">Add new item</Button>
        
        {loading ? <div className="spin"> <Spin size="large" tip="Loading..."/> </div> : 
        <InventoryTable item={item} />}
        
      
        </div>
    )
}

export default Inventory;