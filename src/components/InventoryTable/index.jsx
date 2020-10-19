import React from "react";
import { Table, Button, Space } from 'antd';
const InventoryTable = ({item}) => {

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
            key: 'measurementUnit',
            dataIndex: 'measurementUnit',
            
          },
          {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            
          },
          {
            title: 'Stock',
            key: 'stock',
            dataIndex: 'stock',
            
          },
          {
            title: 'Action',
            key: 'action',
            render: () => (
              <Space>
                <Button type="primary">Edit </Button>
                <Button type="primary" danger> Delete</Button>
              </Space>
            ),
          },
        ];



    return(
        <>
        <Table columns={columns} dataSource={item} />
        </>

    )

}

export default InventoryTable;


