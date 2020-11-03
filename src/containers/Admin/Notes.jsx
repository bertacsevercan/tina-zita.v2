import React from "react";
import NoteCard from "../../components/Admin/NoteCard";
import { Col, Row } from "antd";

export default function Notes({ notesData }) {
  return (
    <div className="site-card-wrapper">
      <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32 }} 
      >
        {notesData.map((note) => (
          <Col
            sm={16}
            md={8}
            >
            <NoteCard noteData={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
