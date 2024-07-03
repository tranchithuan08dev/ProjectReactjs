import { Button, Input, notification } from 'antd';
import {
    RadiusBottomrightOutlined,
} from '@ant-design/icons';

import { Form } from 'antd';

const ChangePasseWord = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description:
                'Đăng nhâp thành công!!!',
            placement,
        });
    };

    const onFinish = (values) => {
        console.log(values);
    };
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    return (
        // {contextHolder}
        <>
            {contextHolder}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}

            >
                <Form.Item
                    name="password"
                    label="PassWord"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="new_password"
                    label="New PassWord"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm_new_password"
                    label="Comfirm New PassWord"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button
                        htmlType="submit"
                        type="primary"
                        onClick={() => openNotification('bottomRight')}
                        icon={<RadiusBottomrightOutlined />}
                    >
                        Submit
                    </Button>

                </Form.Item>


            </Form>
        </>

    );
}







export default ChangePasseWord;