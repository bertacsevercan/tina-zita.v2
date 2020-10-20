import React, {useState, useEffect} from 'react'
import { Button, Radio, Space } from 'antd';

export default function AddNewNoteButton() {
    const [ size, setSize] = useState("medium");
    return (
        <div>
            <Button type="primary" size={size}>
                Add new note
            </Button>
        </div>
    )
}
