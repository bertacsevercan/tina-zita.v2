import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import db from "../../firebaseConfig";
import * as firebase from "firebase";
import { useTranslation } from 'react-i18next';

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const { Option } = Select;

const RecipeForm = ({setDrawerVisible}) => {

  const {t} = useTranslation();

  const [form] = Form.useForm();
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);

  const fetchIngredients = async () => {
    const res = await db.collection("inventory").get();
    const onlyNames = await res.docs.map((name) => name.data().itemName);
    const datas = res.docs.map((data) => {
      return { itemName: data.data().itemName, itemCode: data.data().itemCode };
    });
    setIngredientList(datas);
    setIngredientNames(onlyNames);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const onClose = () => {
    setDrawerVisible(false);
  };

  const onFinish = (values) => {
    const space = " ";
    const rForRecipe = "R";
    const firstThreeLetter = values.recipeName
      ? values.recipeName.slice(0, 3).toUpperCase()
      : null;
    const indexSpace = values.recipeName
      ? values.recipeName.indexOf(space)
      : null;
    const lettersAfterSpace = values.recipeName
      ? values.recipeName.slice(indexSpace + 1, indexSpace + 4).toUpperCase()
      : null;
    const generatedCode =
      values.recipeName && values.recipeName.includes(space)
        ? rForRecipe + firstThreeLetter + lettersAfterSpace
        : rForRecipe + firstThreeLetter;
    const modifiedIngredients = values.ingredients.map((item) => {
    const code = ingredientList.find((x) => x.itemName === item.itemName)
        .itemCode;
      return {
        itemName: item.itemName,
        requiredAmount: Math.round(item.requiredAmount),
        itemCode: code,
        itemDocRef: db.doc(`/inventory/${code}/`),
      };
    });
    db.collection("recipe")
      .doc(generatedCode)
      .set({
        ...values,
        recipeCode: generatedCode,
        createdAt: timestamp(),
        ingredients: modifiedIngredients,
      });
    onClose();
  };

  return (
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.Item name="recipeName" label={t('recipe.addDrawer.nameInput')} rules={[{ required: true, message: t('recipe.addDrawer.missingRecMessage') }]}>
        <Input />
      </Form.Item>
      <Form.List name="ingredients">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.recipeName !== curValues.recipeName ||
                    prevValues.ingredients !== curValues.ingredients
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label={t('recipe.addDrawer.ingredient')}
                      name={[field.name, 'itemName']}
                      fieldKey={[field.fieldKey, 'itemName']}
                      rules={[{ required: true, message: t('recipe.addDrawer.missingIngMessage') }]}
                    >
                      <Select
                        optionFilterProp="children"
                        showSearch
                        placeholder={t('recipe.addDrawer.selectIngMenu')}
                        disabled={!form.getFieldValue('recipeName')} 
                        style={{ width: 200 }}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {ingredientNames.map((item) => (
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
                  label={t('recipe.addDrawer.amount')}
                  name={[field.name, 'requiredAmount']}
                  fieldKey={[field.fieldKey, 'requiredAmount']}
                  rules={[{ required: true, message: t('recipe.addDrawer.warningMissingAmount') }]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              {t('recipe.addDrawer.addIngInp')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div style={{display: "flex" }}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
        {t('recipe.addDrawer.submitBtn')}
        </Button>
      </Form.Item>
      <Form.Item >
      <Button danger onClick={onClose} style={{marginLeft: "1em"}}>
      {t('recipe.addDrawer.cancelBtn')}
        </Button>
      </Form.Item>
      </div>
    </Form>
  );
};

export default RecipeForm;
