import React from "react";
import TutorialsCard from "../../components/TutorialsCard";
import { Typography, Col, Row } from 'antd';

const {Title} = Typography;

const Tutorials = () => {

    return (
        <div>
            <Title level={3}>Tutorials</Title>
            <Row gutter={16}>
                <Col span={8}>
                    <TutorialsCard />
                </Col>
            </Row>
        </div>
    )
}

export default Tutorials;