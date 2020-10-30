import React, { useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectOrder = (props) => {
  const { onChange, onFocus, onBlur, onSearch, orders } = props;

  useEffect(() => {
    console.log("i was rendered", orders);
  });
  return (
    <div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select an order"
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
