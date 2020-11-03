import React from "react";
import { Card } from "antd";
import { Button, Space, Popconfirm } from "antd";

import db from "../../firebaseConfig";

import { useTranslation } from "react-i18next";

export default function NoteCard({ noteData }) {
  const { t } = useTranslation();

  const deleteNote = (key) => {
    db.collection("notes")
      .doc(key)
      .delete()
  };

  return (
    <div>
      <Card title={noteData.title} bordered={true} style={{ overflowWrap: "break-word" , width: 300 }}>
        <p>{noteData.content}</p>
        <Space>
          <Popconfirm
            title={t("adminDashboard.dltBttnWarning")}
            okText={t("deleteButton.ok")}
            cancelText={t("deleteButton.cancel")}
            onConfirm={() => deleteNote(noteData.id)}
          >
            <Button danger>{t("adminDashboard.dltBttn")}</Button>
          </Popconfirm>
        </Space>
      </Card>
    </div>
  );
}
