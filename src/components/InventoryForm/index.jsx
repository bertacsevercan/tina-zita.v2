import React, { useState } from "react";
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const InventoryForm = ({inventoryFormState ,setInventoryFormState}) => {

    const [code, setCode] = useState({
      category: "S",
      name: "",
      generatedCode: ""
    })
  
   
  const handleChangeName = (e,key) => {
    const threeLetterName = e.target.value.slice(0,3).toUpperCase();
    setCode({
      ...code,
      name : threeLetterName
    })
    setInventoryFormState({
      ...inventoryFormState,
      [key] : e.target.value
    })
  }
  

  const handleChangeCategory = (e,key) => {
    const firstLetterCategory =  e[0].toUpperCase();
    setCode({
      ...code,
      category: firstLetterCategory
      
    })

    setInventoryFormState({
      ...inventoryFormState,
      [key] : e
    })
  }

  const handleChange = (e, key) => {
    const iForInventory = "I";

    setCode({
      ...code,
      generatedCode: iForInventory + code.category + code.name
    })

    setInventoryFormState({
        ...inventoryFormState,
        itemCode: code.generatedCode,
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
        onChange={(e) => handleChangeName(e, "itemName")}/>
      </Form.Item>

     

      <Form.Item
        label="Category"
        name="category"
        
      >
        


<Select defaultValue="sebze" value={inventoryFormState.category} 
 style={{ width: 120 }} onChange={(e) => handleChangeCategory(e, "category")}>
      <Option  value="sebze">Sebze</Option>
      <Option value="yeşillik">Yeşillik</Option>
      <Option  value="hayvansal">Hayvansal</Option>
      <Option value="yağ/sos">Yağ/Sos</Option>
      <Option  value="baharat">Baharat</Option>
      <Option value="konserve">Konserve</Option>
      <Option  value="kuru gıda">Kuru Gıda</Option>
    </Select>
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