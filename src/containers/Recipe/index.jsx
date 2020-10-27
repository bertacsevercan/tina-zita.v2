import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig";
import RecipeTable from "../../components/RecipeTable";
import { Typography, Button, Spin, Drawer } from "antd";
import RecipeForm from "../../components/RecipeForm";
import "../../containers/Inventory/style.css";

const { Title } = Typography;
const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [recipeFormState, setRecipeFormState] = useState({
    recipeName: "",
    recipeCode: "",
    ingredients: [],
  });

  const showDrawer = () => {
    setDrawerVisible(true);
  }


  const onClose = () => {
    setDrawerVisible(false);
  }

 
  const onFinish = values => {
    console.log('Received values of form:', values);
    //onClose();
  };

   useEffect(()=> {
        const unsubscribe =
        db
        .collection("recipe")
        .orderBy("orderName", "desc")
        .onSnapshot((snapshot) => {
          const dataArr = [];
          snapshot.forEach((doc) => {
            dataArr.push({ ...doc.data() });
          });
          setRecipe(dataArr);
          setLoading(false);
        });
        
      return unsubscribe;
      
    }, []);
    

  return (
    <div>
      <Title level={3}>Recipe</Title>

      <Button className="button" type="primary" onClick={showDrawer}>
        Add new recipe
      </Button>

      <Drawer
          title="Create a new recipe"
          width={720}
          onClose={onClose}
          visible={drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                height: "25px"
              }}
            >
              {/* <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={onFinish} type="primary">
                Submit
              </Button> */}
            </div>
          }
        >
          <RecipeForm setDrawerVisible={setDrawerVisible}/>
          </Drawer>

      {loading ? (
        <div className="spin">
          {" "}
          <Spin size="large" tip="Loading..." />{" "}
        </div>
      ) : (
        <RecipeTable recipe={recipe} />
      )}
      
    </div>
  );
};

export default Recipe;
