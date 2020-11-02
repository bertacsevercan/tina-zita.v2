import React from "react";
import { Card } from 'antd';

const {Meta} = Card;

const TutorialsCard = () => {

    return(
        <Card
        hoverable
        style={{ width: "19rem" }}
        cover={<img alt="example" src="#" />}
        >
            <Meta title="General layout" />
        </Card>
    )
}

export default TutorialsCard;