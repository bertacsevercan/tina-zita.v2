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
        {
          title: 'Unit',
          dataIndex: 'stock',
          key: 'stock',
        },
        {
          title: 'Remaining stock',
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
            if(doc.data().stock <= doc.data().stockLimit) {
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
