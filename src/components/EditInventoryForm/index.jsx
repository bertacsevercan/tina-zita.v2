import React from "react";
import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import db from "../../firebaseConfig";


const { Option } = Select;

const EditInventoryForm = ({
  editInventoryFormState,
  setEditInventoryFormState,
  keyCode,
  handleOk
}) => {
  const handleChangeInput = (e) => {
    setEditInventoryFormState({
      ...editInventoryFormState,
      [e.target.id]: e.target.value < 0 ? 0 : Math.round(e.target.value),
    });
  };

  const editItem = () => {
    db.collection("inventory").doc(keyCode).update({
      measurementUnit: editInventoryFormState.measurementUnit,
      price: editInventoryFormState.price,
      stock: editInventoryFormState.stock,
    });
    handleOk();
  };

    const {t} = useTranslation();

    const handleChange = (e, key) => {
        setEditInventoryFormState({
            ...editInventoryFormState,
            [key]: (e.target ? e.target.value: e)
        })
    };

    return(
    <div>
      <Form
      onFinish={editItem}
      layout="vertical"
      name="editInventoryForm"
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
        name="stock"
        rules={[
          {
            required: true,
            message: t("inventory.addBtnModal.pleaseStockLimit"),
          },
        ]} 
        > 

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
        name="measurementUnit"
         rules={[
              {
                required: true,
                message: t("inventory.addBtnModal.pleaseSelectUnit"),
              },
            ]}
        >
            <Select value={editInventoryFormState.measurementUnit} 
 style={{ width: 120 }} onChange={(e) => handleChange(e, "measurementUnit")}>
      <Option  value="gr">Gr</Option>
      <Option value="ml">Ml</Option>
    </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInventoryForm;
