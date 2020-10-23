import React, { useState } from "react";
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const EditInventoryForm = ({ editInventoryFormState, setEditInventoryFormState}) => {

    const handleChange = (e, key) => {
        setEditInventoryFormState({
            ...editInventoryFormState,
            [key]: (e.target ? e.target.value: e)
        })
    };
    const handleChangeInput = (e) => {
        setEditInventoryFormState({
            ...editInventoryFormState,
            [e.target.id] : e.target.value < 0 ? 0 : e.target.value
        })
    }

    return(
    <div>
        <Input
        placeholder="Price..."
        min={0}
        type="number"
        id="price"
        name="price"
        value={editInventoryFormState.price}
        onChange={(e) => handleChangeInput(e)}/>

        <Input
        placeholder="Stock..."
         min={0} 
         type="number"
         id="stock"
         name="stock"
         value={editInventoryFormState.stock}
         onChange={(e) => handleChangeInput(e)}/>


<Select defaultValue="gr" value={editInventoryFormState.measurementUnit} 
 style={{ width: 120 }} onChange={(e) => handleChange(e, "measurementUnit")}>
      <Option  value="gr">Gr</Option>
      <Option value="lt">Lt</Option>
    </Select>


    </div>
    )

}

export default EditInventoryForm;