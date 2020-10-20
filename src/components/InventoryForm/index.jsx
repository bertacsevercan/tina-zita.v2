import React from "react";
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const InventoryForm = ({inventoryFormState ,setInventoryFormState}) => {


    const handleChange = (e) => {
        e.persist()
        let category;
        let name;
        if(e.target.id === "category"){
             category = e.target
        } else if(e.target.id === "itemName"){
            name = e.target
        }
         const iForInventory = "I";
         const firstLetterCategory = category.value[0].toUpperCase();
         const threeLetterName =  name.value.slice(0,3).toUpperCase();
         const generatedItemCode =  iForInventory + firstLetterCategory +  threeLetterName;
         console.log(generatedItemCode)
        //console.log(  e.target.id === "itemName" ? inventoryFormState.itemName.slice(0,3).toUpperCase(): null)
        setInventoryFormState({
            ...inventoryFormState,
            //itemCode : generatedItemCode,
            [e.target.id]: e.target.value
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
        onChange={handleChange}/>
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
         onChange={handleChange}/>
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
         onChange={handleChange}/>
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
         onChange={handleChange}/>
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
        {/* <Input 
         type="text"
         id="measurementUnit"
         name="measurementUnit"
         value={inventoryFormState.measurementUnit}
         onChange={handleChange}/> */}

<Select defaultValue="gr" style={{ width: 120 }} onChange={handleChange}>
      <Option id="measurementUnit" value="gr">Gr</Option>
      <Option  id="measurementUnit" value="lt">Lt</Option>
    </Select>
      </Form.Item>
      
    </Form>

    )
    
}

export default InventoryForm;