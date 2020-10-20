import React from "react";
import NoteCard from "../../components/Admin/NoteCard"
import ExpiryTable from "../../components/Admin/ExpiryTable"
import AddNewNoteButton from "../../components/Admin/AddNewNoteButton"
import './Admin.css';
import { Table, Tag, Space } from 'antd';

const Admin = () => {
    return(
        <div>
        <div className="space-align-container">
            <div className="space-align-block">
                <Space align="start">
                    <AddNewNoteButton />
                </Space>
            </div>
        </div>
        <NoteCard />
        <ExpiryTable />
        </div>
       
        
           
    )
}
export default Admin;