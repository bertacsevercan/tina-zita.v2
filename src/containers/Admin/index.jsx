import React, { useEffect, useState } from "react";
import OutOfStockTable from "../../components/Admin/OutOfStockTable";
import { Table, Tag, Space } from 'antd';
import { Typography, Button, Spin, Modal } from 'antd';
import db from "../../firebaseConfig";
import NoteForm from "../../components/Admin/NoteForm";
import Notes from "./Notes";
import "./index.css";

const { Title } = Typography;

const Admin = () => {
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
    
     const handleOk = e => {
        setModalVisible(false);
      };
    
     const handleCancel = e => {
       setModalVisible(false);
      };
  
    const addItem = () => {
      db.collection("notes").doc().set(
        {
          title: noteFormState.title,
          content: noteFormState.content,
        }
      )
      handleOk();
        //When I click add new item second time, last value remains there, it should be empty
    }

    useEffect(()=> {
        const note =
        db
        .collection("notes")
        .onSnapshot((snapshot) => {
          const dataArr = [];
          snapshot.forEach((doc) => {
            dataArr.push({ ...doc.data(), id: doc.id })
          });
          console.log(dataArr)
          setNote(dataArr);
          setLoading(false);
        });
      return note;
    }, []);
    console.log(note)
    return(
        <Space direction="vertical">
        <Title level={2}>Dashboard</Title>
        <h2 className="outOfStock">Out of stock</h2>
        <OutOfStockTable />
        <h2 className="notes">Notes</h2>
        <Button onClick={showModal} className="button" type="primary">Add new note</Button>
        <Modal
          title="Add new note"
          visible={modalVisible}
          onOk={addItem}
          onCancel={handleCancel}
        >
          <NoteForm noteFormState={noteFormState} setNoteFormState={setNoteFormState} />
        </Modal>
        {/* {loading ? <div className="spin"> <Spin size="large" tip="Loading..."/> </div> :
        <NoteCard /> } */}
        <Notes notesData={note}/>
        </Space>
    )
}
export default Admin;
