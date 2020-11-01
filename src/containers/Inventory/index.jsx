import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig";
import InventoryTable from "../../components/InventoryTable";
import { Typography, Spin } from "antd";
import "../../containers/Inventory/style.css";
import InventoryForm from "../../components/InventoryForm";
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Inventory = () => {

  const {t}  = useTranslation();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const unsubscribe = db
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

  return (
    <div>
      <Title level={3}>{t('inventory.inventory')}</Title>
      <InventoryForm />
      {loading ? (
        <div className="spin">
          <Spin size="large" tip={t('inventory.loading')} />
        </div>
      ) : (
        <InventoryTable item={item} />
      )}
    </div>
  );
};

export default Inventory;
