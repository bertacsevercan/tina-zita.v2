import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig"
import InventoryTable from "../../components/InventoryTable";
import { Typography, Button, Spin, Modal } from 'antd';
import "../../containers/Inventory/style.css";
import InventoryForm from "../../components/InventoryForm";
import * as firebase from "firebase";


const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const { Title } = Typography;
const Inventory = () => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState([]);
    const [inventoryFormState, setInventoryFormState] = useState({
      category: "sebze",
      itemCode: "",
      itemName: "",
      measurementUnit: "gr",
      price: "",
      stock: "",
    });

  


   const showModal = () => {
      setModalVisible(true);
    };
  
   const handleOk = e => {
      setModalVisible(false);
      
    };
  
   const handleCancel = e => {
     setModalVisible(false);
    };

  const addItem = () => {
    db.collection("inventory").doc(inventoryFormState.itemCode).set(
      {
        category: inventoryFormState.category,
        itemCode: inventoryFormState.itemCode,
        itemName: inventoryFormState.itemName,
        measurementUnit: inventoryFormState.measurementUnit,
        price: inventoryFormState.price,
        stock: inventoryFormState.stock,
        createdAt: timestamp()
      }
    )

    handleOk();
  }
  

    useEffect(()=> {
        const unsubscribe =
        db
        .collection("inventory")
        .orderBy("createdAt", "desc")
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
       
        <Button onClick={showModal} className="button" type="primary">Add new item</Button>

        <Modal
          title="Add new item to inventory"
          visible={modalVisible}
          onOk={addItem}
          onCancel={handleCancel}
        >
          <InventoryForm inventoryFormState={inventoryFormState} setInventoryFormState={setInventoryFormState} />
        </Modal>
        
        {loading ? <div className="spin"> <Spin size="large" tip="Loading..."/> </div> : 
        <InventoryTable  item={item} />}


        
      
        </div>
    )
}

export default Inventory;