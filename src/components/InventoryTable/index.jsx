import React, { useState } from "react";
import { Table, Button, Input, Space, Popconfirm, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import db from "../../firebaseConfig";
import EditInventoryForm from "../EditInventoryForm";

const InventoryTable = ({ item }) => {
  const [search, setSearch] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [editInventoryFormState, setEditInventoryFormState] = useState({
    measurementUnit: "gr",
    price: 0,
    stock: 0,
  });

  const [keyCode, setKeyCode] = useState("");

  let searchInput;

  const deleteItem = (key) => {
    db.collection("inventory")
      .doc(key)
      .delete()
      .then(() => console.log("Document deleted succesfully!"))
      .catch((err) => console.log("Error occured", err));
  };
  const editItem = () => {
    db.collection("inventory").doc(keyCode).update({
      measurementUnit: editInventoryFormState.measurementUnit,
      price: editInventoryFormState.price,
      stock: editInventoryFormState.stock,
    });
    handleOk();
  };
  const showModal = (key) => {
    setModalVisible(true);
    setKeyCode(key);
  };

  const handleOk = (e) => {
    setModalVisible(false);
  };

  const handleCancel = (e) => {
    setModalVisible(false);
  };

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
  const columns = [
    {
      title: "Name",
      dataIndex: "itemName",
      key: "itemName",
      editable: true,
      ...getColumnSearchProps("itemName"),
    },
    {
      title: "Code",
      dataIndex: "itemCode",
      key: "itemCode",
      ...getColumnSearchProps("itemCode"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
      editable: true,
      ...getColumnSearchProps("category"),
    },
    {
      title: "Unit",
      key: "measurementUnit",
      dataIndex: "measurementUnit",
      responsive: ["md"],
      editable: true,
      filters: [
        {
          text: "gr",
          value: "gr",
        },
        {
          text: "lt",
          value: "lt",
        },
      ],
      onFilter: (value, record) => record.measurementUnit.indexOf(value) === 0,
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      responsive: ["md"],
      editable: true,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      key: "stock",
      dataIndex: "stock",
      editable: true,
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Action",
      key: "action",
      responsive: ["md"],
      render: (record) => (
        <Space>
          <Button onClick={() => showModal(record.itemCode)} type="primary">
            Edit{" "}
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteItem(record.itemCode)}
          >
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
      <Table columns={columns} dataSource={item} />
      <Modal
        destroyOnClose
        title="Edit item info"
        visible={modalVisible}
        onOk={editItem}
        onCancel={handleCancel}
      >
        <EditInventoryForm
          editInventoryFormState={editInventoryFormState}
          setEditInventoryFormState={setEditInventoryFormState}
        />
      </Modal>
    </>
  );
};

export default InventoryTable;
