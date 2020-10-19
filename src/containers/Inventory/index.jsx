import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig"
import InventoryTable from "../../components/InventoryTable";
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
        <h1>Inventory</h1>
        <InventoryTable item={item} />
        </div>
    )
}

export default Inventory;