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
            <Row gutter={16}>
                <TutorialsCard />
            </Row>
        </div>
    )
}

export default Tutorials;