import React from "react";
import { Card, Col } from 'antd';
import {useTranslation} from "react-i18next";
import videoList from "../../videos";

const {Meta} = Card;


const TutorialsCard = () => {
    const {t} = useTranslation();

    const textList = [t("tutorials.loginScreen"), t("tutorials.generalNav"), t("tutorials.inventoryDetail")];
    
    const videoObjList = []

    for(let i = 0; i < videoList.length; i++){
        videoObjList.push({video: videoList[i], title: textList[i]})
    }
    
    return(
        <div>
            {videoObjList.map(obj => (
            <Col
            span={8}>
            <Card
            hoverable
            style={{ width: "25rem"}}
            cover={obj.video}>
            <Meta title={obj.title} />
            </Card>
          </Col>
           
            ))}
        </div>
    )
}

export default TutorialsCard;