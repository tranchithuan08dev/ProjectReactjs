// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, Form, Input, Image, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const NewUser = () => {
    const [avatarUrl, setAvatarUrl] = useState("");
    const [file, setFile] = useState(null);
    const onFinish = (values) => {
        console.log(values);
    };

    const beforeUpload = () => {
        return false;
    };
    const handleChangeImage = (info) => {
        const file = info.file;
        const imgUrl = URL.createObjectURL(file);
        setAvatarUrl(imgUrl);
        setFile(file);
    };

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 20,
                }}
            >
                <Space size={12}>
                    <Image
                        width={200}
                        src={avatarUrl}
                        style={{ borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px' }}
                    />
                    <Upload name="file" beforeUpload={beforeUpload} onChange={handleChangeImage}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Space>
            </Form.Item>
            <Form.Item name="first-name" label="First Name">
                <Input />
            </Form.Item>
            <Form.Item name="last-name" label="Last Name">
                <Input />
            </Form.Item>
            <Form.Item name="nick-name" label="Nick Name">
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="email" label="Email">
                <Input />
            </Form.Item>
            <Form.Item name="Description" label="Description">
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Tạo tài khoản
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewUser;
