import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig"
import InventoryTable from "../../components/InventoryTable";
import { Typography, Button, Spin, Modal } from 'antd';
import "../../containers/Inventory/style.css";
import InventoryForm from "../../components/InventoryForm";
import * as firebase from "firebase";
import { useTranslation } from 'react-i18next';

const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const { Title } = Typography;

const Inventory = () => {
    const [t,i18n] = useTranslation();

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState([]);
    const [inventoryFormState, setInventoryFormState] = useState({
      category: "sebze",
      itemCode: "",
      itemName: "",
      measurementUnit: "gr",
      price: 0,
      stock: 0,
      stockLimit: 0,
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
        stockLimit: inventoryFormState.stockLimit,
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

        <Title level={3}>{t('inventory.inventory')}</Title>
       
        <Button onClick={showModal} className="button" type="primary">{t('inventory.addBtn')}</Button>

        <Modal
          title={t('inventory.addBtnModal.modalTitle')}
          visible={modalVisible}
          onOk={addItem}
          onCancel={handleCancel}
        >
          <InventoryForm inventoryFormState={inventoryFormState} setInventoryFormState={setInventoryFormState} />
        </Modal>
        
        {loading ? <div className="spin"> <Spin size="large" tip={t('inventory.loading')}/> </div> : 
        <InventoryTable inventoryFormState={inventoryFormState} setInventoryFormState={setInventoryFormState} item={item} />}

        </div>
    )
}

export default Inventory;