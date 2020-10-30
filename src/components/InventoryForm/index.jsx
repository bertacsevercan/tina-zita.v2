import React, { useState } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import db from "../../firebaseConfig";
import * as firebase from "firebase";

const { Option } = Select;
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const InventoryForm = () => {
  const [code, setCode] = useState({
    category: "SEB",
    name: "",
    generatedCode: "",
  });
  const [inventoryFormState, setInventoryFormState] = useState({
    category: "sebze",
    itemCode: "",
    itemName: "",
    measurementUnit: "gr",
    price: 0,
    stock: 0,
    stockLimit: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  const handleOk = (e) => {
    setModalVisible(false);
  };

  const handleCancel = (e) => {
    setModalVisible(false);
  };

  const addItem = () => {
    db.collection("inventory").doc(inventoryFormState.itemCode).set({
      category: inventoryFormState.category,
      itemCode: inventoryFormState.itemCode,
      itemName: inventoryFormState.itemName,
      measurementUnit: inventoryFormState.measurementUnit,
      price: inventoryFormState.price,
      stock: inventoryFormState.stock,
      stockLimit: inventoryFormState.stockLimit,
      createdAt: timestamp(),
    });

    handleOk();
  };

  const handleChangeName = (e, key) => {
    const threeLetterName = e.target.value.slice(0, 3).toUpperCase();
    setCode({
      ...code,
      name: threeLetterName,
    });
    setInventoryFormState({
      ...inventoryFormState,
      [key]: e.target.value,
    });
  };

  const handleChangeCategory = (e, key) => {
    const firstLetterCategory = e.slice(0, 3).toUpperCase();
    setCode({
      ...code,
      category: firstLetterCategory,
    });

    setInventoryFormState({
      ...inventoryFormState,
      [key]: e,
    });
  };

  const handleChange = (e, key) => {
    const iForInventory = "I";

    setCode({
      ...code,
      generatedCode: iForInventory + code.category + code.name,
    });

    setInventoryFormState({
      ...inventoryFormState,
      itemCode: code.generatedCode,
      [key]: e.target ? e.target.value : e,
    });
  };

  return (
    <div>
      <Button onClick={showModal} className="button" type="primary">
        Add new item
      </Button>
      <Modal
        destroyOnClose={true}
        title="Add new item to inventory"
        visible={modalVisible}
        onOk={addItem}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          name="inventoryForm"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Item name"
            name="itemName"
            rules={[
              {
                required: true,
                message: "Please input item name!",
              },
            ]}
          >
            <Input
              type="text"
              id="itemName"
              name="itemName"
              value={inventoryFormState.itemName}
              onChange={(e) => handleChangeName(e, "itemName")}
            />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select
              defaultValue="sebze"
              value={inventoryFormState.category}
              style={{ width: 120 }}
              onChange={(e) => handleChangeCategory(e, "category")}
            >
              <Option value="sebze">Sebze</Option>
              <Option value="yeşillik">Yeşillik</Option>
              <Option value="hayvansal">Hayvansal</Option>
              <Option value="yağ/sos">Yağ/Sos</Option>
              <Option value="baharat">Baharat</Option>
              <Option value="konserve">Konserve</Option>
              <Option value="kuru gıda">Kuru Gıda</Option>
              <Option value="meyve">Meyve</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input
              min={0}
              type="number"
              id="price"
              name="price"
              value={inventoryFormState.price}
              onChange={(e) => handleChange(e, "price")}
            />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input item stock amount!",
              },
            ]}
          >
            <Input
              min={0}
              type="number"
              id="stock"
              name="stock"
              value={inventoryFormState.stock}
              onChange={(e) => handleChange(e, "stock")}
            />
          </Form.Item>
          <Form.Item
            label="Warn me when stock less than this amount"
            name="stockLimit"
            rules={[
              {
                required: true,
                message: "Please input the least stock limit to warn you!",
              },
            ]}
          >
            <Input
              min={0}
              type="number"
              id="stockLimit"
              name="stockLimit"
              value={inventoryFormState.stockLimit}
              onChange={(e) => handleChange(e, "stockLimit")}
            />
          </Form.Item>
          <Form.Item
            label="Unit"
            name="measurementUnit"
            rules={[
              {
                required: true,
                message: "Please select item measure unit!",
              },
            ]}
          >
            <Select
              defaultValue="gr"
              value={inventoryFormState.measurementUnit}
              style={{ width: 120 }}
              onChange={(e) => handleChange(e, "measurementUnit")}
            >
              <Option value="gr">Gr</Option>
              <Option value="lt">Lt</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryForm;
