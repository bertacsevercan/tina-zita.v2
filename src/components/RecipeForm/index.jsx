import React from "react";
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const RecipeForm = ({setDrawerVisible}) => {
  const [form] = Form.useForm();


  const onClose = () => {
    setDrawerVisible(false);
  }

  const onFinish = values => {
    console.log('Received values of form:', values);
    onClose();
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
                      <Select disabled={!form.getFieldValue('recipeName')} style={{ width: 130 }}>
                        {(["asdf", "zxc"]).map(item => (
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
        <Button type="primary" htmlType="submit">
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