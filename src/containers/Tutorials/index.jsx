import React from "react";
import TutorialsCard from "../../components/TutorialsCard";
import { Typography, Col, Row } from 'antd';
import {useTranslation} from "react-i18next";

const {Title} = Typography;

const Tutorials = () => {
    const {t} = useTranslation();

    return (
        <div>
            <Title level={3}>{t("tutorials.header0")}</Title>
            <Row gutter={16}>
                <Col span={8}>
                    <TutorialsCard />
                </Col>
            </Row>
        </div>
    )
}

export default Tutorials;