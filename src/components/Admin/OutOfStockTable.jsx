import React, { useEffect, useState } from "react";
import { Table, Spin} from 'antd';
import db from "../../firebaseConfig"
import { useTranslation } from 'react-i18next';
import "./style.css";

const OutOfStockTable = () => {

    const [outOfStock, setOutOfStock] = useState();
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();

      const columns = [
        {
          title: t('adminDashboard.name'),
          dataIndex: 'itemName',
          key: 'itemName',
        },
        {
          title: t('adminDashboard.code'),
          dataIndex: 'itemCode',
          key: 'itemCode',
        },
        {
          title: t('adminDashboard.category'),
          dataIndex: 'category',
          responsive: ["md"],
          key: 'category',
        },
        {
          title: t('adminDashboard.unit'),
          dataIndex: 'measurementUnit',
          responsive: ["md"],
          key: 'measurementUnit',
        },
        {
          title: t('adminDashboard.remainingStock'),
          dataIndex: 'stock',
          key: 'stock',
        },
      ];
      useEffect(()=> {
        const OoS =
        db
        .collection("inventory")
        .onSnapshot((snapshot) => {
          const dataArr = [];
          snapshot.forEach((doc) => {
            if((doc.data().stock <= doc.data().stockLimit)) {
                dataArr.push(doc.data())
              }
          });
          setOutOfStock(dataArr);
          setLoading(false);
        });
        
      return OoS;
    }, []);
    
  return (
    <div>
      {loading ? (
          <div className="spin">
            <Spin size="large" tip={t('adminDashboard.loading')} />
          </div>
        ) : (
      <Table dataSource={outOfStock} columns={columns} /> )}
    </div>
  );
}

export default OutOfStockTable;