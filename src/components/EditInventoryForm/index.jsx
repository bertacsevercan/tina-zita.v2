import React, { useState } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const EditInventoryForm = ({
  editInventoryFormState,
  setEditInventoryFormState,
}) => {
  const handleChange = (e, key) => {
    setEditInventoryFormState({
      ...editInventoryFormState,
      [key]: e.target ? e.target.value : e,
    });
  };
  const handleChangeInput = (e) => {
    setEditInventoryFormState({
      ...editInventoryFormState,
      [e.target.id]: e.target.value < 0 ? 0 : e.target.value,
    });
  };

  return (
    <div>
      <Form
        layout="vertical"
        name="inventoryForm"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item label="Price" name="price">
          <Input
            placeholder="Price..."
            min={0}
            type="number"
            id="price"
            name="price"
            value={editInventoryFormState.price}
            onChange={(e) => handleChangeInput(e)}
          />
        </Form.Item>

        <Form.Item label="Stock" name="stock">
          <Input
            placeholder="Stock..."
            min={0}
            type="number"
            id="stock"
            name="stock"
            value={editInventoryFormState.stock}
            onChange={(e) => handleChangeInput(e)}
          />
        </Form.Item>

        <Form.Item label="Unit" name="measurementUnit">
          <Select
            defaultValue="gr"
            value={editInventoryFormState.measurementUnit}
            style={{ width: 120 }}
            onChange={(e) => handleChange(e, "measurementUnit")}
          >
            <Option value="gr">Gr</Option>
            <Option value="lt">Lt</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInventoryForm;
