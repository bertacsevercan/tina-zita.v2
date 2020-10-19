import React from "react";
import { Table, Tag, Space } from 'antd';
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
            render: (text, record) => (
              <Space size="small">
                <button>Edit {record.name}</button>
                <button>Delete</button>
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


/*const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode); */