import React, { useEffect, useState } from "react";
import OutOfStockTable from "../../components/Admin/OutOfStockTable";
import { Typography, Button, Spin, Modal, Space } from "antd";
import db from "../../firebaseConfig";
import NoteForm from "../../components/Admin/NoteForm";
import Notes from "./Notes";
import { useTranslation } from "react-i18next";
import "./style.css";

const { Title } = Typography;

const Admin = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState([]);
  const [noteFormState, setNoteFormState] = useState({
    title: "",
    content: "",
  });
  const clearInputs = () => {
    setNoteFormState({
      title: "",
      content: "",
    });
  };

  const showModal = () => {
    clearInputs();
    setModalVisible(true);
  };

  const handleOk = (e) => {
    setModalVisible(false);
    clearInputs();
  };

  const handleCancel = (e) => {
    setModalVisible(false);
  };

  const addItem = () => {
    db.collection("notes").doc().set({
      title: noteFormState.title,
      content: noteFormState.content,
    });
    handleOk();
  };

  useEffect(() => {
    const note = db.collection("notes").onSnapshot((snapshot) => {
      const dataArr = [];
      snapshot.forEach((doc) => {
        dataArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(dataArr);
      setNote(dataArr);
      setLoading(false);
    });
    return note;
  }, []);

  return (
    <div>
      <Space direction="vertical">
        <Title level={3}>{t("adminDashboard.dashboard")}</Title>
        <h1 className="outOfStock">{t("adminDashboard.outOfStockTable")}</h1>
        <OutOfStockTable />
        <h1 className="notes">{t("adminDashboard.myNotes")}</h1>
        <Button onClick={showModal} className="button" type="primary">
          {t("adminDashboard.addBtn")}
        </Button>
        <Modal
          title={t("adminDashboard.addBtn")}
          destroyOnClose={true}
          visible={modalVisible}
          //onOk={addItem}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
            {t("inventory.addBtnModal.cancel")}
          </Button>,
            <Button key="ok" onClick={addItem}>
              {t("inventory.addBtnModal.ok")}
            </Button>,
          ]}
        >
          <NoteForm
            noteFormState={noteFormState}
            setNoteFormState={setNoteFormState}
          />
        </Modal>
        {loading ? (
          <div className="spin">
            <Spin size="large" tip="Loading..." />{" "}
          </div>
        ) : (
          <Notes notesData={note} />
        )}
      </Space>
    </div>
  );
};
export default Admin;

/* useEffect(() => {
    const note = db.collection("notes").onSnapshot((snapshot) => {
      const dataArr = [];
      snapshot.forEach((doc) => {
        dataArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(dataArr);
      setNote(dataArr);
      setLoading(false);
    });
    return note;
  }, []);
  console.log(note);
  return (
    <div>
      <Title level={3}>Dashboard</Title>
      <OutOfStockTable />
      <Button onClick={showModal} className="button" type="primary">
        Add new note
      </Button>
      <Modal
        destroyOnClose={true}
        title="Add new note"
        visible={modalVisible}
        onOk={addItem}
        onCancel={handleCancel}
      >
        <NoteForm
          noteFormState={noteFormState}
          setNoteFormState={setNoteFormState}
        />
      </Modal>
      {/* {loading ? <div className="spin"> <Spin size="large" tip="Loading..."/> </div> :
        <NoteCard /> } */
/* <Notes notesData={note} />
    </div>
  );
}; */
