import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig";
import RecipeTable from "../../components/RecipeTable";
import { Typography, Button, Spin } from "antd";
import "../../containers/Inventory/style.css";

const { Title } = Typography;
const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    return db.collection("recipe").onSnapshot((snapshot) => {
      if (snapshot.docChanges().length === 0) {
      }
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setRecipe((prevRecipe) => [
            ...prevRecipe,
            { ...change.doc.data(), id: change.doc.id },
            // console.log(change.doc.data()),
          ]);
          setLoading(false);
        }
        if (change.type === "modified") {
          setRecipe((prevRecipe) => {
            const newArrRecipes = [...prevRecipe];
            let index = newArrRecipes.findIndex(
              (el) => el.id === change.doc.id
            );
            if (index !== -1) {
              newArrRecipes[index] = {
                ...change.doc.data(),
                id: change.doc.id,
              };
            }
            setLoading(false);
            return newArrRecipes;
          });
        }
        if (change.type === "removed") {
          setRecipe((prevRecipe) => {
            const newArrRecipes = [...prevRecipe];
            let index = newArrRecipes.findIndex(
              (el) => el.id === change.doc.id
            );

            if (index !== -1) {
              newArrRecipes.splice(index, 1);
            }
            setLoading(false);
            return newArrRecipes;
          });
        }
      });
    });
  }, []);
  console.log(recipe);

  return (
    <div>
      <Title level={3}>Recipe</Title>

      <Button className="button" type="primary">
        Add new item
      </Button>

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
