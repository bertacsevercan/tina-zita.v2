import React from "react";
import TutorialsCard from "../../components/TutorialsCard";
import { Typography, Row } from 'antd';
import {useTranslation} from "react-i18next";

const {Title} = Typography;

const Tutorials = () => {
    const {t} = useTranslation();

    return (
        <div className="site-card-wrapper">
            <Title level={3}>{t("tutorials.header0")}</Title>
            <Row style={{display: "flex", justifyContent: "center"}} gutter={{xs: 8, sm: 16, md: 24, lg: 32 }}>
                <TutorialsCard sty />
            </Row>
        </div>
    )
}

export default Tutorials;