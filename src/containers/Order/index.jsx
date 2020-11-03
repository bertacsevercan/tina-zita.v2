import React, { useEffect, useState } from "react";
import SelectOrder from "../../components/SelectOrder/SelectOrder";
import OrderTable from "../../components/OrderTable";
import { Button, Input, Typography, Spin, notification, Space } from "antd";
import "./style.css";
import db from "../../firebaseConfig";
import { useTranslation } from 'react-i18next';
import * as firebase from "firebase";

const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const date = new Date();

const { Title } = Typography;

const Order = () => {

  const {t} = useTranslation();

  const [orders, setOrders] = useState([])
  const [orderMultiplier, setOrderMultiplier] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState("")
  const [orderedFood, setOrderedFood] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await db.collection("recipe").get();
    const data = res.docs.map((doc) => doc.data());
    setOrders(data);
  };

 
  const showNotification = (type, content, title) => {
    notification[type]({
      message: title,
      description:
        typeof content === "object" ? content.join(", ") : content
    });
  };

  
  const addOrder = async () => {
    if (orders.length > 0) {
      let isSufficient = true;
      const insufficientIngredients = [];
      const ingredientsArr = orders.find(
        (order) => order.recipeCode === selectedOrder
      ).ingredients;
      for (let i = 0; i < ingredientsArr.length; i++) {
        const orderItem = ingredientsArr[i];
        const res = await orderItem.itemDocRef.get();
        const data = res.data();
       
        if (data.stock - orderItem.requiredAmount * orderMultiplier < 0) {
          isSufficient = false;
          insufficientIngredients.push(data.itemName)
        }
      }

      if (isSufficient) {
        ingredientsArr.forEach(async (orderItem) => {
          const res = await orderItem.itemDocRef.get();
          const data = res.data();
          orderItem.itemDocRef.update({
            stock: data.stock - orderItem.requiredAmount * orderMultiplier,
          });
        });
        for (let i = 0; i < orderMultiplier; i++) {
          db.collection("order").add({
            createdAt: timestamp(),
            recipeCode: selectedOrder,
            orderName: orders.find((x) => x.recipeCode === selectedOrder)
              .recipeName,
          });
        }
        showNotification("success", t('order.successNotification'), t('order.successNotification2'));
      } else {
        showNotification("error", insufficientIngredients, t('order.errorNotification'));
      }
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
          dataArr.push({ ...doc.data(), docId : doc.id , date : doc.data().createdAt && `${doc.data().createdAt.toDate().getDate()}/${doc.data().createdAt.toDate().getMonth() + 1}/${doc.data().createdAt.toDate().getFullYear()}`});
        });
        const filteredArr = dataArr.filter(x => x.createdAt && x.createdAt.toDate().getMonth() === date.getMonth())
        setOrderedFood(filteredArr);
        setLoading(false);
      });

    return unsubscribe;
  }, []);
  return (
    <div>
      <Title level={3}>{t('order.orders')}</Title>
      <div className="orderInputs" /* style={{ display: "flex", justifyContent: "center" }} */>
        <Space>
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
        </Space>
      </div>
      {loading ? (
        <div className="spin">
          <Spin size="large" tip={t('order.loading')} />
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
