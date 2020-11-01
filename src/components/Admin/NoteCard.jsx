import React, {useState, useEffect} from 'react'
import { Card, Col, Row } from 'antd';
import { Table, Button, Input, Space, Popconfirm, Modal } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import EditNoteForm from './EditNoteForm';
import db from '../../firebaseConfig';

export default function NoteCard( {noteData} ) {

    console.log(noteData)
    const [ size, setSize] = useState("medium");
    const [ editNoteFormState, setEditNoteFormState] = useState({
        title: "",
        content: "",
    })
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
      };
    
     const handleOk = e => {
        setModalVisible(false);
      };
    
     const handleCancel = e => {
       setModalVisible(false);
      };

      const deleteNote = (key) => {
        db.collection("notes").doc(key)
        .delete().then(()=> console.log("Document deleted succesfully!"))
        .catch((err)=> console.log("Error occured" , err))
      }

      const editNote = () => {
        
      }
    return (
        <div >
            <Card title={noteData.title} bordered={true} style={{ width: 300 }}>
            <p>{noteData.content}</p>
           
            <Modal
              title="Edit"
              visible={modalVisible}
              onOk={editNote}
              onCancel={handleCancel}
            >
                <EditNoteForm editNoteFormState={editNoteFormState}
                    setEditNoteFormState={setEditNoteFormState} />
            </Modal>
            <Popconfirm title="Sure to delete?" onConfirm={()=> deleteNote(noteData.id)}>
            <Button  type="primary" danger>
                Delete
            </Button>
            </Popconfirm>
            </Card>
            
        </div>
    )
}
