import React from "react";
import { Card, Col } from 'antd';
import {useTranslation} from "react-i18next";
import videoList from "../../videos";
import "./style.css";

const {Meta} = Card;


const TutorialsCard = () => {
    const {t} = useTranslation();

    const textList = [t("tutorials.loginScreen"), t("tutorials.generalNav"), t("tutorials.inventoryDetail")
,t("tutorials.recipeDetail")];
    
    const videoObjList = []

    for(let i = 0; i < videoList.length; i++){
        videoObjList.push({video: videoList[i], title: textList[i]})
    }
    
    return(
        <>
            {videoObjList.map(obj => (
            <Col
            //span={{lg: 12}}
            // lg={{span: 12}}
            // md={{span: 16}}
            >
            <Card
            className="tutorialCard"
            hoverable
            //style={{ width: "32rem"}}
            cover={obj.video}>
            <Meta title={obj.title} />
            </Card>
          </Col>
           
            ))}
        </>
    )
}

export default TutorialsCard;