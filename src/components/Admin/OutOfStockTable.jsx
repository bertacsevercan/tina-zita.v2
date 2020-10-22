import React from 'react'
import { Table, Tag, Space } from 'antd';

export default function OutOfStockTable() {
    const dataSource = [
        {
          key: '1',
          code: 'MAY20102020',
          name: "Maydonoz",
        },
        {
          key: '2',
          code: 'BUL19102020',
          name: "Bulgur",
        },
      ];

      const columns = [
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
      ];


    return (
        <div>
            <Table dataSource={dataSource} columns={columns}/>
        </div>
    )
}
