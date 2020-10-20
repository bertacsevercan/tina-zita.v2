import React, { useState } from "react";
import { Table, Button,Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const InventoryTable = ({item}) => {
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });

  let searchInput;

    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearch({ searchText: '' });
  };
  const columns = [
    {
        title: 'Name',
        dataIndex: 'itemName',
        key: 'itemName',
        ...getColumnSearchProps('itemName')
        
       
      },
      {
        title: 'Code',
        dataIndex: 'itemCode',
        key: 'itemCode',
        ...getColumnSearchProps('itemCode')
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        responsive: ['md'],
        ...getColumnSearchProps('category')
      },
      {
        title: 'Unit',
        key: 'measurementUnit',
        dataIndex: 'measurementUnit',
        responsive: ['md'],
        filters: [
          {
            text: 'gr',
            value: 'gr',
          },
          {
            text: 'lt',
            value: 'lt',
          },
        ],
        onFilter: (value, record) => record.measurementUnit.indexOf(value) === 0,
        
      },
      {
        title: 'Price',
        key: 'price',
        dataIndex: 'price',
        responsive: ['md'],
        sorter: (a, b) => a.price - b.price,

        
      },
      {
        title: 'Stock',
        key: 'stock',
        dataIndex: 'stock',
        sorter: (a, b) => a.stock - b.stock,
       
       

        
      },
      {
        title: 'Action',
        key: 'action',
        responsive: ["md"],
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


