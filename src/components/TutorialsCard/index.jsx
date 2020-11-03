import React from "react";
import { Card, Col } from 'antd';
import {useTranslation} from "react-i18next";
import videoList from "../../videos";
import "./style.css";

const {Meta} = Card;


const TutorialsCard = () => {
    const {t} = useTranslation();

    const textList = [t("tutorials.loginScreen"), t("tutorials.generalNav"), t("tutorials.inventoryDetail")
,t("tutorials.recipeDetail"), t("tutorials.orderDetail"), t("tutorials.adminDetail"),
t("tutorials.tutorialDetail")];
    
    const videoObjList = []

    for(let i = 0; i < videoList.length; i++){
        videoObjList.push({video: videoList[i], title: textList[i]})
    }
    
    return(
        <>
            {videoObjList.map(obj => (
            <Col>
            <Card
            className="tutorialCard"
            hoverable
            cover={obj.video}>
            <Meta title={obj.title} />
            </Card>
          </Col>
            ))}
        </>
    )
}

export default TutorialsCard;