import React, {useState, useEffect} from 'react'
import { Card, Col, Row } from 'antd';
import { Table, Button, Input, Space, Popconfirm, Modal } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import db from '../../firebaseConfig';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default function NoteCard( {noteData} ) {

    const [t,i18n] = useTranslation();
    //console.log(noteData)
    const [ size, setSize] = useState("medium");
    
      const deleteNote = (key) => {
        db.collection("notes").doc(key)
        .delete().then(()=> console.log("Document deleted succesfully!"))
        .catch((err)=> console.log("Error occured" , err))
      }
    return (
        <div >
            <Card title={noteData.title} bordered={true} style={{ width: 300 }}>
            <p>{noteData.content}</p>
            <Popconfirm title={t('adminDashboard.dltBttnWarning')} onConfirm={()=> deleteNote(noteData.id)}>
            <Button  type="primary" danger>
                {" "}
                {t('adminDashboard.dltBttn')}
            </Button>
            </Popconfirm>
            </Card>
        </div>
    )
}
