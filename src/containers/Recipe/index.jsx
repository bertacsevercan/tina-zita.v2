import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig";
import RecipeTable from "../../components/RecipeTable";
import { Typography, Button, Spin, Drawer } from "antd";
import RecipeForm from "../../components/RecipeForm";
import "../../containers/Inventory/style.css";
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const Recipe = () => {

  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

 

  useEffect(() => {
    const unsubscribe = db
      .collection("recipe")
      .orderBy("createdAt", "desc")
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

      <Title level={3}>{t('recipe.recipe')}</Title>

      <Button className="button" type="primary" onClick={showDrawer}>
        {t('recipe.addBtn')}
      </Button>

      <Drawer
          destroyOnClose={true}
          title={t('recipe.addDrawer.title')}
          width={window.innerWidth > 576 ? 740 : 350}
          onClose={onClose}
          visible={drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <RecipeForm setDrawerVisible={setDrawerVisible}/>
          </Drawer>

      {loading ? (
        <div className="spin">
          <Spin size="large" tip={t('recipe.loading')} />{" "}
        </div>
      ) : (
        <RecipeTable recipe={recipe} />
      )}
    </div>
  );
};

export default Recipe;
