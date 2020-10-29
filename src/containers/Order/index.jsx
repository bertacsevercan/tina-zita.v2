import React, { useEffect, useState } from "react";
import SelectOrder from "../../components/SelectOrder/SelectOrder"
import { Button, Input, Typography, Spin } from 'antd';
import db from "../../firebaseConfig";
import { Alert } from 'antd';
import OrderTable from "../../components/OrderTable";

const {Title} = Typography;

const Order = () => {
  const [orders, setOrders] = useState([])
  const [orderMultiplier, setOrderMultiplier] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState("")
  const [insufficientIngredients, setInsufficientIngredients]= useState([])
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await db.collection("recipe").get()
    const data = await res.docs.map(doc => doc.data());
    const data2 = data.map(obj => {
      return {label: obj.recipeName, value:obj.recipeCode};
    })
    // console.log("data",data.find((order) => order.orderCode === "OSAL"));
    // console.log("data",res)
    setOrders(data)

  }

  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };

  const addOrder = async() => {
    if (orders.length > 0){
      let isSufficient = true
      
      const ingredientsArr = orders
      .find((order) => order.recipeCode === selectedOrder)
      .ingredients;
      console.log("ingArr", ingredientsArr)
      ingredientsArr.forEach(async(orderItem) => {
      const res = await orderItem.itemDocRef.get()
      console.log("ingrArrRESdata",res)
      const data = await res.data()
      console.log("ingredArrDAta",toString(data.stock))//this is undefined
    if(data.stock - orderItem.requiredAmount * orderMultiplier < 0) {
      isSufficient = false
      console.log(isSufficient);
      //if the ingredient is insufficient, add it into insufficient ingredients state array
      setInsufficientIngredients(prevState=>[...prevState, orderItem])
    }
    })
    setTimeout(()=> {

      if (isSufficient) {
        console.log("i'm sufficient");
        ingredientsArr.forEach(async(orderItem) => {
          const res = await orderItem.itemDocRef.get()
          const data = res.data()
          console.log(data.stock);
          orderItem.itemDocRef.update({
            stock: data.stock - orderItem.requiredAmount * orderMultiplier
          })
        });
        
      } else {
        return <Alert
        message="Error Text"
        description={`Insufficient ingredients: ${insufficientIngredients.join(", ")}`}
        type="error"
        closable
        onClose={onClose}
      />
        // alert("insufficient ingredients")
      }

    },1000)
    


      
      
    } else {
      console.log("empty");
    }
  }

  function onChange(value) {
      setSelectedOrder(value);
    }
    
  
    useEffect(() => {
      fetchOrders();
      const unsubscribe =
        db
        .collection("order")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const dataArr = [];
          snapshot.forEach((doc) => {
            dataArr.push({ ...doc.data() });
          });
          setOrders(dataArr);
          setLoading(false);
        });
      return unsubscribe;
    },[]);

  return(
      <div >
      <Title level={3}>Orders</Title>
      <div style={{display:"flex", justifyContent: "center"}}>
      <SelectOrder 
      onChange={onChange} 
      orders={orders}/>
      <Input style={{width: "200px"}} type="number" onChange={(e) => setOrderMultiplier(e.target.value)} value={orderMultiplier} placeholder="number of orders" min={1}/>
      <Button disabled={selectedOrder? false : true} onClick={addOrder} type="primary">Add Order</Button>
      </div>
      {loading ? (
        <div className="spin">
          {" "}
          <Spin size="large" tip="Loading..." />{" "}
        </div>
      ) : (
        <OrderTable recipe={orders} />
      )}
      </div>
  )
}

export default Order;







