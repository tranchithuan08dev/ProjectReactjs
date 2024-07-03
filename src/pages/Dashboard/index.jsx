


import { useState } from 'react';
import {
    BarChartOutlined,
    EditOutlined,
    FileDoneOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusCircleOutlined,
    UploadOutlined,
    UserAddOutlined,
    UserOutlined,
    UsergroupAddOutlined,

} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal, Space } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const nevigate = useNavigate()
    const handleOk = () => {
        setIsModalOpen(false);
        nevigate('/')
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function HandleDropDown() {
        setShowDropDown(!showDropDown);
    }
    return (
        <Layout>

            <Sider trigger={null} collapsible collapsed={collapsed}>

                <div className="demo-logo-vertical" />
                <h1>React Admin</h1>
                <Menu

                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <FileDoneOutlined />,
                            label: <Link to={`/dashboard/post/127`}>Bài viết</Link>,
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: <Link to={'/dashboard/profile'}>Profile</Link>,
                        },
                        {
                            key: '3',
                            icon: <PlusCircleOutlined />,
                            label: <Link to={'/dashboard/new-post'}>New Post</Link>,
                        },
                        {
                            key: '6',
                            icon: <BarChartOutlined />,
                            label: (
                                <Space onClick={HandleDropDown}>
                                    Managerments
                                </Space>
                            ),
                        },
                        showDropDown && {

                            key: '7',
                            icon: <UsergroupAddOutlined />,
                            label: <Link to={'/dashboard/new-user'} >New User</Link>
                        },
                        showDropDown && {
                            key: '8',
                            icon: <UserAddOutlined />,
                            label: <Link to={'/dashboard/all-user'} >All User</Link>
                        },

                        {
                            key: '4',
                            icon: <EditOutlined />,
                            label: <Link to={'/dashboard/change-password'}>Change PassWord</Link>,
                        },

                        {
                            key: '5',
                            icon: <UploadOutlined />,
                            label: (
                                <a href="#" onClick={showModal} > Đăng Xuất </a>
                            )

                        },

                    ]}
                >

                </Menu>

            </Sider>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn đăng xuất </p>

            </Modal>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Dashboard;