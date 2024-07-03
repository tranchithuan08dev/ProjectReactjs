import { useState } from 'react';
import { Button, Drawer, Form, Input, Space, Table, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const AllUser = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: 'NickName',
            dataIndex: 'nickname',
            key: 'nickname',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'FullName',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => (
                <span>
                    <Button style={{ color: 'blue' }} onClick={showLargeDrawer}>
                        Chỉnh sửa
                    </Button>
                    <Button style={{ color: 'red' }}>Xóa</Button>
                </span>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            nickname: 'John11 Brown',
            fullname: 32,
            email: 111,
        },
        {
            key: '2',
            nickname: 'Jim Green',
            fullname: 42,
            email: 111,
        },
        {
            key: '3',
            nickname: 'Joe Black',
            fullname: 32,
            email: 111,
        },
    ];
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
        <>
            <Table columns={columns} dataSource={data} />
            <Drawer
                title={`${size} Drawer`}
                placement="right"
                size={size}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
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
            </Drawer>
        </>
    );
};

export default AllUser;
