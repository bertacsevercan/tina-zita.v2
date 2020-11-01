import React from 'react'
import NoteCard from "../../components/Admin/NoteCard";
import { Card, Col, Row, Space } from 'antd';

export default function Notes( {notesData} ) {
    return (
        <div className="site-card-wrapper">
            <Row gutter={16} >
            {notesData.map( note => 
                <Col span={8} className="notes">
                <NoteCard noteData={note}/>
                </Col>
                )}
            </Row>
        </div>
    )
}
