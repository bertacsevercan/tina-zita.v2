import React, { useEffect, useState } from "react";
import SelectOrder from "../../components/SelectOrder/SelectOrder"
import { Button, Input, Typography } from 'antd';
import db from "../../firebaseConfig"

const {Title} = Typography;

const Order = () => {
  const [orders, setOrders] = useState([])
  const [orderMultiplier, setOrderMultiplier] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState("")
  const fetchOrders = async () => {
    const res = await db.collection("recipe").get()
    const data = res.docs.map(doc => doc.data());
    const data2 = data.map(obj => {
      return {label: obj.orderName, value:obj.orderCode};
    })
    console.log("data",data.find((order) => order.orderCode === "OSAL").ingredients);
    setOrders(data)

  }

  const addOrder = async() => {
    if (orders.length > 0){
      let isSufficient = true
      const ingredientsArr = orders
      .find((order) => order.orderCode === selectedOrder)
      .ingredients;
      
      ingredientsArr.forEach(async(orderItem) => {
      const res = await orderItem.itemDocRef.get()
    const data = res.data()
    console.log(data.stock);
    if(data.stock - orderItem.requiredAmount * orderMultiplier < 0) {
      isSufficient = false
      console.log(isSufficient);
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
        alert("insufficient ingredients")
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
      </div>
  )
}

export default Order;







