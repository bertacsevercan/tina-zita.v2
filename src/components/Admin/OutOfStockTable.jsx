import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from 'antd';
import db from "../../firebaseConfig"
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default function OutOfStockTable() {

    const [outOfStock, setOutOfStock] = useState();
    const [t,i18n] = useTranslation();

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
          key: 'category',
        },
        {
          title: t('adminDashboard.unit'),
          dataIndex: 'measurementUnit',
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
        });
        
      return OoS;
    }, []);
    console.log(outOfStock)
    
  return (
    <div>
      <Table dataSource={outOfStock} columns={columns} />
    </div>
  );
}
