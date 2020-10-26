import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from 'antd';
import db from "../../firebaseConfig"

export default function OutOfStockTable() {

    const [outOfStock, setOutOfStock] = useState();
   
      const columns = [
        {
          title: 'Name',
          dataIndex: 'itemName',
          key: 'itemName',
        },
        {
          title: 'Code',
          dataIndex: 'itemCode',
          key: 'itemCode',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },
      ];
      useEffect(()=> {
        const OoS =
        db
        .collection("inventory")
        .onSnapshot((snapshot) => {
          const dataArr = [];
          snapshot.forEach((doc) => {
            if(doc.data().stock <= 10) {
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
            <Table dataSource={outOfStock} columns={columns}/>
        </div>
    )
}
