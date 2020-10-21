import React from "react";

const Order = () => {
    return(
        <h1>Order page here!</h1>
    )
}
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

export default Order;