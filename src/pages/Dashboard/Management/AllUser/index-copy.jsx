import { useState } from 'react';
import { Button, Drawer, Space, Table, } from 'antd';
import NewUser from '../NewUser';


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
                <NewUser />
            </Drawer>
        </>
    );
};

export default AllUser;
