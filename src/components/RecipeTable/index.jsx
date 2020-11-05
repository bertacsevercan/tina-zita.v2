import React, { useState } from "react";
import { Table, Button, Input, Space, Popconfirm, Modal, List, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import db from "../../firebaseConfig";
import { useTranslation } from 'react-i18next';

const { Link } = Typography;
const RecipeTable = ({ recipe }) => {

  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [search, setSearch] = useState({
    searchText: "",
    searchedColumn: "",
  });

  let searchInput;

  const showModal = (record) => {
    setModalVisible(true);
    const ingredients = record.ingredients.map(
      (ingredient) => ingredient.itemName + ` (${ingredient.requiredAmount})`
    );
    setIngredientList(ingredients);
  };

  const handleOk = (e) => {
    setModalVisible(false);
  };

  const handleCancel = (e) => {
    setModalVisible(false);
  };

  const deleteRecipe = (key) => {
    db.collection("recipe")
      .doc(key)
      .delete()
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
            {t('recipe.searchBox')}
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {t('recipe.reset')}
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
      title: t('recipe.name'),
      dataIndex: "recipeName",
      key: "recipeName",
      ...getColumnSearchProps("recipeName"),
      render: (text, record) => <Link href="#" onClick={() => showModal(record)}>{text}</Link>,
    },
    {
      title: t('recipe.code'),
      dataIndex: "recipeCode",
      key: "recipeCode",
      ...getColumnSearchProps("recipeCode"),
    },
    {
      title: t('recipe.action'),
      key: "action",
      //responsive: ["md"],
      render: (record) => (
        <Space>
          <Popconfirm title={t('recipe.sureToDelete')}
          okText={t("deleteButton.ok")}
          cancelText={t("deleteButton.cancel")} 
          onConfirm={()=> deleteRecipe(record.recipeCode)}>
          <Button type="primary" danger>
            {" "}
           {t('recipe.deleteBtn')}
          </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={recipe} />
      <Modal
        destroyOnClose={true}
        title="Ingredient List"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="OK" type="primary" onClick={handleOk}>
            {t('recipe.ok')}
          </Button>,
        ]}
      >
        <List
          size="small"
          bordered
          dataSource={ingredientList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Modal>
    </>
  );
};

export default RecipeTable;
