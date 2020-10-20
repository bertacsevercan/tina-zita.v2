import React from 'react'
import { Table, Tag, Space } from 'antd';

export default function ExpiryTable() {
    const dataSource = [
        {
          key: '1',
          code: 'MAY20102020',
          name: "Maydonoz",
          expireIn: 2,
        },
        {
          key: '2',
          code: 'BUL19102020',
          name: "Bulgur",
          expireIn: 3,
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
        {
          title: 'Expire in',
          dataIndex: 'expireIn',
          key: 'expireIn',
        },
      ];


    return (
        <div>
            <Table dataSource={dataSource} columns={columns}/>
        </div>
    )
}
