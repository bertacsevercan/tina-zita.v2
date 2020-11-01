import React, { useState } from "react";
import { Table, Button, Input, Space, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useTranslation } from 'react-i18next'

const OrderTable = ({ orderedFood }) => {

  const [t,i18n] = useTranslation();
  const [search, setSearch] = useState({
    searchText: "",
    searchedColumn: "",
  });

  
  let searchInput;

 
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
      title: t("order.tableHeader0"),
      dataIndex: "orderName",
      key: "orderName",
      editable: true,
      ...getColumnSearchProps("orderName"),
    },
    {
      title: t("order.tableHeader1"),
      key: "date",
      dataIndex: "date" ,
      responsive: ["md"],
      editable: true,
      ...getColumnSearchProps("date"),
    },
    {
      title: t("order.tableHeader2"),
      key: "action",
      responsive: ["md"],
      render: (record) => (
        <Space>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => console.log(record.date)}
          >
            <Button type="primary" danger>
              {" "}
              {t('order.cancelBtn')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={orderedFood} />
    </>
  );
};

export default OrderTable;
