import React, { useState } from "react";
import { Form, Input } from "antd";

const NoteForm = ({ noteFormState, setNoteFormState }) => {
  const [size, setSize] = useState("default");

  const handleChange = (e, key) => {
    setNoteFormState({
      ...noteFormState,
      [key]: e.target ? e.target.value : e,
    });
  };
  return (
    <div>
      <Form
        layout="vertical"
        name="inventoryForm"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Note title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter note title!",
            },
          ]}
        >
          <Input
            type="text"
            id="title"
            name="title"
            value={noteFormState.title}
            onChange={(e) => handleChange(e, "title")}
          />
        </Form.Item>

        <Form.Item
          label="Note"
          name="note"
          rules={[
            {
              required: true,
              message: "Please enter your note!",
            },
          ]}
        >
          <Input.TextArea
            type="text"
            id="note"
            name="note"
            size={size}
            value={noteFormState.note}
            onChange={(e) => handleChange(e, "content")}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default NoteForm;
