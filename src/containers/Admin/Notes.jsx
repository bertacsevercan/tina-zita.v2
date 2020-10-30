import React from "react";
import NoteCard from "../../components/Admin/NoteCard";
import { Card, Col, Row } from "antd";

export default function Notes({ notesData }) {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {notesData.map((note) => (
          <Col span={8}>
            <NoteCard noteData={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
