import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Space, Upload, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpDateProfile } from '../../../store/authSlice';


function Profile() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.success({
      message: `Cập nhật thông tin thành công`,
      placement: 'topRight',
    });
  };
  const currentUser = useSelector((state) => state.AUTH.currentUser);
  console.log('currentUSER', currentUser);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.simple_local_avatar?.full);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  // form instance
  const [form] = Form.useForm();
  const initialValues = {
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    nickname: currentUser?.nickname,
    description: currentUser?.description,
  };

  const handleSubmit = (values) => {
    setLoading(true);
    let formData = null;
    if (file) {
      formData = new FormData();
      formData.append('file', file);
    }
    dispatch(fetchUpDateProfile({ data: values, formData })).then((res) => {
      setLoading(false);
      openNotification();
    });
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

  useEffect(() => {
    if (currentUser) {
      setAvatarUrl(currentUser?.simple_local_avatar?.full);
      form.setFieldsValue({
        first_name: currentUser?.first_name,
        last_name: currentUser?.last_name,
        nickname: currentUser?.nickname,
        description: currentUser?.description,
      });
    }
  }, [currentUser]);

  return (
    <>
      {contextHolder}
      <Form

        name="wrap"
        onFinish={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Space size={12}>
            <Image width={200} src={avatarUrl} style={{ borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px' }} />
            <Upload name="file" beforeUpload={beforeUpload} onChange={handleChangeImage}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Space>
        </Form.Item>
        <Form.Item label="First Name" name="first_name">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name">
          <Input />
        </Form.Item>
        <Form.Item label="Nickname" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Profile;
