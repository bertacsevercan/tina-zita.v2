import React, { useEffect, useState } from "react";
import OutOfStockTable from "../../components/Admin/OutOfStockTable";
import { Typography, Button, Spin, Modal } from "antd";
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
 

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = (e) => {
    setModalVisible(false);
  };

  const handleCancel = (e) => {
    setModalVisible(false);
  };


  useEffect(() => {
    const note = db.collection("notes").onSnapshot((snapshot) => {
      const dataArr = [];
      snapshot.forEach((doc) => {
        dataArr.push({ ...doc.data(), id: doc.id });
      });
      setNote(dataArr);
      setLoading(false);
    });
    return note;
  }, []);

  return (
    <div>
      <Title level={3}>{t("adminDashboard.dashboard")}</Title>
      <h1 className="outOfStock">{t("adminDashboard.outOfStockTable")}</h1>
      <OutOfStockTable />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginLeft: "0.3rem" }}>
          <h1 className="notes">{t("adminDashboard.myNotes")}</h1>
          <Button onClick={showModal} className="button" type="primary">
            {t("adminDashboard.addBtn")}
          </Button>
        </div>
        <div>
          <Modal
            title={t("adminDashboard.addBtn")}
            destroyOnClose={true}
            visible={modalVisible}
            onCancel={handleCancel}
            footer={[
              <Button danger key="cancel" onClick={handleCancel}>
                {t("inventory.addBtnModal.cancel")}
              </Button>,
              <Button type="primary" form="noteForm"  key="submit" htmlType="submit">
                {t("inventory.addBtnModal.ok")}
              </Button>,
            ]}
          >
            <NoteForm
              noteFormState={noteFormState}
              setNoteFormState={setNoteFormState}
              handleOk={handleOk}
            />
          </Modal>
          {loading ? (
            <div className="spin">
              <Spin size="large" tip={t("adminDashboard.loading")} />{" "}
            </div>
          ) : (
            <Notes notesData={note} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
