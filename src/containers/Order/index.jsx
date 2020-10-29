import React, { useEffect, useState } from "react";
import SelectOrder from "../../components/SelectOrder/SelectOrder"
import { Button, Input } from 'antd';
import db from "../../firebaseConfig";
import { Alert } from 'antd';

const Order = () => {
  const [orders, setOrders] = useState([])
  const [orderMultiplier, setOrderMultiplier] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState("")
  const [insufficientIngredients, setInsufficientIngredients]= useState([])
  const fetchOrders = async () => {
    const res = await db.collection("recipe").get()
    const data = res.docs.map(doc => doc.data());
    const data2 = data.map(obj => {
      return {label: obj.orderName, value:obj.orderCode};
    })
    console.log("data",data.find((order) => order.orderCode === "OSAL").ingredients);
    setOrders(data)

  }

  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };

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
      
    },[]);
  return(
      <div >
      <h1>Order page here!</h1>
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


/* const fetchData = async () => {
        const res = await db.collection("recipe").doc("RSAL").get()
        const data = res.data()
        //const ref = await data.ingredients[0].SAL.get()
        const ref = await db.collection("inventory").doc("SSAL").get()
        const refData = ref.data()
        console.log(refData)

        db.collection("test").doc("KEY").set(({
            ref: db.doc("/inventory/SSAL/")
        }))
    }
    useEffect(() => {
        fetchData();
    },[])
 */





