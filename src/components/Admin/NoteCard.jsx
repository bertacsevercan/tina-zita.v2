import React, {useState, useEffect} from 'react'
import { Card, Col, Row } from 'antd';
import { Button, Radio, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';



export default function NoteCard() {
    const [ size, setSize] = useState("medium");

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="Card title" bordered={true} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <Button type="primary" size={size}>
                Edit
            </Button>
            <Button type="primary" danger>
                Delete
            </Button>
            </Card>
            
        </div>
    )
}
