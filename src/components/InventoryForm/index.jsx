import React from "react";
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const InventoryForm = ({inventoryFormState ,setInventoryFormState}) => {

  
    const handleChange = (e, key) => {
      setInventoryFormState({
          ...inventoryFormState,
          [key]: (e.target ? e.target.value: e)
      })
  }


    return(
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
            message: 'Please input item name!',
          },
        ]}
      >
        <Input  
        type="text"
        id="itemName"
        name="itemName"
        value={inventoryFormState.itemName}
        onChange={(e) => handleChange(e, "itemName")}/>
      </Form.Item>

      <Form.Item
        
        label="Item Code"
        name="itemCode"
        rules={[
          {
            required: true,
            message: 'Please input item code!',
          },
        ]}
      >
        <Input  
        type="text"
        id="itemCode"
        name="itemCode"
        value={inventoryFormState.itemCode}
        onChange={(e) => handleChange(e, "itemCode")}/>
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        
      >
        <Input
         type="text"
         id="category"
         name="category"
         value={inventoryFormState.category}
         onChange={(e) => handleChange(e, "category")}/>
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        
      >
        <Input
         type="text"
         id="price"
         name="price"
         value={inventoryFormState.price}
         onChange={(e) => handleChange(e, "price")}/>
      </Form.Item>

      <Form.Item
        
        label="Stock"
        name="stock"
        rules={[
          {
            required: true,
            message: 'Please input item stock amount!',
          },
        ]}
      >
        <Input 
         type="text"
         id="stock"
         name="stock"
         value={inventoryFormState.stock}
         onChange={(e) => handleChange(e, "stock")}/>
      </Form.Item>

      <Form.Item
        
        label="Unit"
        name="measurementUnit"
        rules={[
          {
            required: true,
            message: 'Please select item measure unit!',
          },
        ]}
      >
      

<Select defaultValue="gr" value={inventoryFormState.measurementUnit} 
 style={{ width: 120 }} onChange={(e) => handleChange(e, "measurementUnit")}>
      <Option  value="gr">Gr</Option>
      <Option value="lt">Lt</Option>
    </Select>
      </Form.Item>
      
    </Form>

    )
    
}

export default InventoryForm;