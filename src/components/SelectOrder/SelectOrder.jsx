import React from "react";
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const SelectOrder = (props) => {
  const { onChange, onFocus, onBlur, onSearch, orders } = props
  const {t} = useTranslation();

  return (
    <div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={t('order.selectAnOrder')}
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {orders.map((order) => (
          <Option value={order.recipeCode}>{order.recipeName}</Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectOrder;
