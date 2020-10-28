import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import db from "../../firebaseConfig"

const { Option } = Select;

const RecipeForm = ({setDrawerVisible}) => {
  const [form] = Form.useForm();
  const [ingredientList, setIngredientList] = useState([]);
  const [code, setCode] = useState("");

  const fetchIngredients = async() => {
    const res = await db.collection("inventory").get()
    const datas = res.docs.map(data => data.data().itemName)
    setIngredientList(datas);
  }

  useEffect(()=> {
    fetchIngredients();
}, []);

  const onClose = () => {
    setDrawerVisible(false);
  }

  const onFinish = values => {
    console.log('Received values of form:', values);
    const space = " ";
    const rForRecipe = "R";
    const firstThreeLetter = values.recipeName ? values.recipeName.slice(0,3).toUpperCase(): null;
    const indexSpace = values.recipeName ? values.recipeName.indexOf(space) : null
    const lettersAfterSpace = values.recipeName ?  values.recipeName.slice(indexSpace + 1, indexSpace + 4).toUpperCase() : null
    const generatedCode = values.recipeName && values.recipeName.includes(space) ? rForRecipe + firstThreeLetter + 
    lettersAfterSpace : rForRecipe + firstThreeLetter;
    console.log(generatedCode)
    setCode(generatedCode);
  };

  return (
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.Item name="recipeName" label="Recipe Name" rules={[{ required: true, message: 'Missing recipe name' }]}>
        <Input />
      </Form.Item>
      <Form.List name="ingredients">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.recipeName !== curValues.recipeName || prevValues.ingredients !== curValues.ingredients
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Ingredient"
                      name={[field.name, 'ingredient']}
                      fieldKey={[field.fieldKey, 'ingredient']}
                      rules={[{ required: true, message: 'Missing ingredient' }]}
                    >
                      <Select     
                      optionFilterProp="children"
                        showSearch 
                        disabled={!form.getFieldValue('recipeName')} 
                        style={{ width: 200 }}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {ingredientList.map(item => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Amount"
                  name={[field.name, 'amount']}
                  fieldKey={[field.fieldKey, 'amount']}
                  rules={[{ required: true, message: 'Missing amount' }]}
                >
                  <Input onChange={onFinish} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add ingredients
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div style={{display: "flex" }}>
      <Form.Item>
        <Button disabled={!form.getFieldValue('ingredients')} onClick={onClose} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item >
      <Button onClick={onClose} style={{marginLeft: "1em"}}>
               Cancel 
        </Button>
      </Form.Item>
      </div>
    </Form>
  );
};

export default RecipeForm