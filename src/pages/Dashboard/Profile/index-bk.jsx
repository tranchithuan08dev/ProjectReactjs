import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';

import { Image, Space } from 'antd';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpDateProfile } from '../../../store/authSlice';


function Profile() {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => (state.POST.currentUser))

    const initialValues = {
        first_name: currentUser?.first_name,
        last_name: currentUser?.last_name,
        nickname: currentUser?.nickname,
        description: currentUser?.description,
    }
    console.log(currentUser);
    form.setFieldsValue(initialValues)

    const onFinish = (values) => {
        console.log('Received values:', values);
        dispatch(fetchUpDateProfile(values))
    };
    const onDownload = () => {
        fetch(src)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'image.png';
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                link.remove();
            });
    };

    // const handleChange = (e) => {
    //     // setImageUrl(URL.createObjectURL(e.target.file[0]))
    //     console.log(setImageUrl(URL.createObjectURL(e.target.file[0])));
    // };

    return (
        <Form
            onFinish={onFinish}
            name="wrap"
            form={form}
        >
            <Form.Item name="avatar">
                <Space size={12}>
                    <Image
                        style={{ borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px' }}
                        width={200}
                        src={src}
                        preview={{
                            toolbarRender: (
                                _,
                                {
                                    transform: { scale },
                                    actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                                },
                            ) => (
                                <Space size={12} className="toolbar-wrapper">
                                    <DownloadOutlined onClick={onDownload} />
                                    <SwapOutlined rotate={90} onClick={onFlipY} />
                                    <SwapOutlined onClick={onFlipX} />
                                    <RotateLeftOutlined onClick={onRotateLeft} />
                                    <RotateRightOutlined onClick={onRotateRight} />
                                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                </Space>
                            ),
                        }}
                    />
                    <div>
                        <h1>Admin</h1>
                        <input type="file"
                        //  onChange={handleChange}
                        />
                    </div>
                </Space>
            </Form.Item>

            <Form.Item
                label="First Name"
                name="first_name"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="last_name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Nick Name"
                name="nickname"

            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"


            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                    Thay đổi Profile
                </Button>
            </Form.Item>
        </Form>
    );
}



export default Profile;


