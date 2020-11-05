import React from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import db from "../../firebaseConfig";

const NoteForm = ({ noteFormState, setNoteFormState, handleOk }) => {
  const { t } = useTranslation();

  const addNote = () => {
    db.collection("notes").doc().set({
      title: noteFormState.title,
      content: noteFormState.content,
    });
    handleOk();
    setNoteFormState({
      title: "",
      content: "",
    });
  };


  const handleChange = (e, key) => {
    setNoteFormState({
      ...noteFormState,
      [key]: e.target ? e.target.value : e,
    });
  };
  return (
    <div>
      <Form
        onFinish={addNote}
        layout="vertical"
        name="noteForm"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label={t("adminDashboard.noteTitle")}
          name="title"
          rules={[
            {
              required: true,
              message: t("adminDashboard.pleaseEnterTitle"),
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
          label={t("adminDashboard.note")}
          name="note"
          rules={[
            {
              required: true,
              message: t("adminDashboard.pleaseEnterNote"),
            },
          ]}
        >
          <Input.TextArea
            type="text"
            id="note"
            name="note"
            value={noteFormState.note}
            onChange={(e) => handleChange(e, "content")}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default NoteForm;
