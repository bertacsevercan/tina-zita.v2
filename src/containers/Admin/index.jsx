import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Admin/NoteCard"
import OutOfStockTable from "../../components/Admin/OutOfStockTable"
import { Table, Tag, Space } from 'antd';
import { Typography, Button, Spin, Modal } from 'antd';
import db from "../../firebaseConfig"
import NoteForm from "../../components/Admin/NoteForm"


const { Title } = Typography;

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState([]);
    const [noteFormState, setNoteFormState] = useState({
      title: "",
      note: "",
      id: "",
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
          note: noteFormState.note,
        }
      )
      handleOk();
    }

    useEffect(()=> {
        const note =
        db
        .collection("notes")
        .onSnapshot((snapshot) => {
          const dataArr = [];
          snapshot.forEach((doc) => {
            dataArr.push({ ...doc.data() });
          });
          setNote(dataArr);
          setLoading(false);
        });
        
      return note;
      
    }, []);

    return(
        <div>
        <Title level={3}>Dashboard</Title>
        <OutOfStockTable />

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
        </div>
    )
}
export default Admin;
