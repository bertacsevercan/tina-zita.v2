import React, { useEffect, useState } from "react";
import SelectOrder from "../../components/SelectOrder/SelectOrder";
import OrderTable from "../../components/OrderTable";
import { Button, Input, Typography, message, Spin } from "antd";
import "./style.css";
import db from "../../firebaseConfig";
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import * as firebase from "firebase";

const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const date = new Date();

const { Title } = Typography;

const Order = () => {

  const [t,i18n] = useTranslation();

  const [orders, setOrders] = useState([])
  const [orderMultiplier, setOrderMultiplier] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState("")
  const [insufficientIngredients, setInsufficientIngredients]= useState([])
  const [orderedFood, setOrderedFood] = useState([]);

  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    const res = await db.collection("recipe").get();
    const data = res.docs.map((doc) => doc.data());
    console.log("str ", data);
    /* const data2 = data.map(obj => {
      return {label: obj.recipeName, value:obj.recipeCode};
    }) */
    // console.log("data",data.find((order) => order.recipeCode === "OSAL").ingredients);
    setOrders(data);
  };

  const success = () => {
    message.success("Order successful!");
  };

  const error = () => {
    message.error("Insufficient ingredients!"); // add which ingredient is insufficient
  };

  const addOrder = async () => {
    if (orders.length > 0) {
      let isSufficient = true;

      const ingredientsArr = orders.find(
        (order) => order.recipeCode === selectedOrder
      ).ingredients;
      console.log("ingArr", ingredientsArr);
      for (let i = 0; i < ingredientsArr.length; i++) {
        const orderItem = ingredientsArr[i];
        const res = await orderItem.itemDocRef.get();
        console.log(res);
        const data = res.data();
        console.log("data", data);
        if (data.stock - orderItem.requiredAmount * orderMultiplier < 0) {
          isSufficient = false;
          console.log(isSufficient);
        }
      }

      if (isSufficient) {
        console.log("i'm sufficient");
        ingredientsArr.forEach(async (orderItem) => {
          const res = await orderItem.itemDocRef.get();
          const data = res.data();
          console.log(data.stock);
          orderItem.itemDocRef.update({
            stock: data.stock - orderItem.requiredAmount * orderMultiplier,
          });
        });
        for (let i = 0; i < orderMultiplier; i++) {
          db.collection("order").add({
            createdAt: timestamp(),
            orderName: orders.find((x) => x.recipeCode === selectedOrder)
              .recipeName,
          });
        }
        success();
      } else {
        error();
      }
    } else {
      console.log("empty");
    }
  };

  function onChange(value) {
    setSelectedOrder(value);
  }
  useEffect(() => {
    fetchOrders();

    const unsubscribe = db
      .collection("order")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const dataArr = [];
        snapshot.forEach((doc) => {
          dataArr.push({ ...doc.data(), date : doc.data().createdAt && date.getMonth() === doc.data().createdAt.toDate().getMonth() ? `${doc.data().createdAt.toDate().getDate()}/${doc.data().createdAt.toDate().getMonth() + 1}/${doc.data().createdAt.toDate().getFullYear()}` : null});
        });
        console.log("dataarr", (dataArr))
        console.log("date", date.getMonth())
        setOrderedFood(dataArr);
        setLoading(false);
      });

    return unsubscribe;
  }, []);
  return (
    <div>
      <Title level={3}>{t('order.orders')}</Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SelectOrder onChange={onChange} orders={orders} />
        <Input
          style={{ width: "200px" }}
          type="number"
          onChange={(e) => setOrderMultiplier(e.target.value)}
          value={orderMultiplier}
          placeholder="number of orders"
          min={1}
        />
        <Button
          disabled={selectedOrder ? false : true}
          onClick={addOrder}
          type="primary"
        >
          {t('order.addOrder')}
        </Button>
      </div>
      {loading ? (
        <div className="spin">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div style={{ marginTop: "1em" }}>
          <OrderTable orderedFood={orderedFood} />
        </div>
      )}
    </div>
  );
};

export default Order;
