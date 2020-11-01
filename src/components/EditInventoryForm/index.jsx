import React, { useState } from "react";
import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';


const { Option } = Select;

const EditInventoryForm = ({
  editInventoryFormState,
  setEditInventoryFormState,
}) => {
  const handleChangeInput = (e) => {
    setEditInventoryFormState({
      ...editInventoryFormState,
      [e.target.id]: e.target.value < 0 ? 0 : e.target.value,
    });
  };

    const [t,i18n] = useTranslation();

    const handleChange = (e, key) => {
        setEditInventoryFormState({
            ...editInventoryFormState,
            [key]: (e.target ? e.target.value: e)
        })
    };

    return(
    <div>
           <Form
      layout="vertical"
      name="inventoryForm"
      initialValues={{
        remember: true,
      }}
      
    >
         <Form.Item
        label={t('inventory.editModal.price')}
        name="price"
        
      >
           <Input
        placeholder={t('inventory.editModal.pricePlc')}
        min={0}
        type="number"
        id="price"
        name="price"
        value={editInventoryFormState.price}
        onChange={(e) => handleChangeInput(e)}/>

      </Form.Item>
       
      <Form.Item
        
        label={t('inventory.editModal.Stock')}
        name="stock" > 

         <Input
        placeholder={t('inventory.editModal.StockPlc')}
         min={0} 
         type="number"
         id="stock"
         name="stock"
         value={editInventoryFormState.stock}
         onChange={(e) => handleChangeInput(e)}/>
        
        </Form.Item>
       

        <Form.Item
        
        label={t('inventory.editModal.unit')}
        name="measurementUnit">
            <Select defaultValue="gr" value={editInventoryFormState.measurementUnit} 
 style={{ width: 120 }} onChange={(e) => handleChange(e, "measurementUnit")}>
      <Option  value="gr">Gr</Option>
      <Option value="lt">Lt</Option>
    </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInventoryForm;
