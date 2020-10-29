import React, {useState, useEffect} from "react";
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import db from "../../firebaseConfig";

const RecipeTable = ({ order }) => {

  const [search, setSearch] = useState({
    searchText: "",
    searchedColumn: "",
  });

  let searchInput;

  const deleteOrder = (key) => {
    console.log("record", key)
    db.collection("order").doc(key)
    .delete().then(()=> console.log("Document deleted succesfully!"))
    .catch((err)=> console.log("Error occured" , err))
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearch({ searchText: "" });
  };
  const columns = [//changed here
    {
      title: "Name",
      dataIndex: "recipeInfo.recipeName",
      key: "recipeInfo.recipeName",
      ...getColumnSearchProps("recipeName"),
    },
    {
      title: "Code",
      dataIndex: "recipeInfo.recipeCode",
      key: "recipeInfo.recipeCode",
      ...getColumnSearchProps("recipeCode"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Order time",
      dataIndex: "createAt",
      key: "createAt",
      ...getColumnSearchProps("createAt"),
    },
    {
      title: "Action",
      key: "action",
      responsive: ["md"],
      render: (record) => (
        <Space>
          <Popconfirm title="Sure to delete?" onConfirm={()=> deleteOrder(record.recipeCode)}>
          <Button type="primary" danger>
            {" "}
            Delete
          </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={order} />
    </>
  );
};

export default RecipeTable;
