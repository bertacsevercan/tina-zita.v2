import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig"
import InventoryTable from "../../components/InventoryTable";
import { Typography, Button } from 'antd';
import "../../containers/Inventory/index.css";

const { Title } = Typography;
const Inventory = () => {
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
        });
        
      return unsubscribe;
      
    }, []);
    



    return(
        <div>

       
        <Title level={3}>Inventory</Title>
       
        <Button className="button" type="primary">Add new item</Button>
        
        <InventoryTable item={item} />
      
        </div>
    )
}

export default Inventory;