import { useState } from 'react';
import {
    CheckCircleOutlined,
    DownOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Tag, Space, Input, Form, Button } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddPost } from '../../../store/postsSlice';
function NewPost() {
    const categories = useSelector((state) => state.CATEGORY.list);
    const [showTagsCategories, setShowTagsCategories] = useState(false);
    const dispatch = useDispatch();
    const [selectedCategories, setSelectedCategories] = useState([])
    function handleSelectedCategories(id) {
        let newSelected = [];
        if (selectedCategories.includes(id)) {
            newSelected = selectedCategories.filter(item => item !== id)
        } else {
            newSelected = [...selectedCategories, id]
        }
        setSelectedCategories(newSelected)
    }


    let CategoriesJSX = [];
    if (categories) {
        for (const id in categories) {
            CategoriesJSX.push(<Tag
                key={id}
                icon={selectedCategories.includes(id) ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
                color={selectedCategories.includes(id) ? 'success' : 'default'}
                onClick={() => handleSelectedCategories(id)}
            >
                {categories[id].name}
            </Tag>)
        }
    }
    const handleTitleClick = () => {
        setShowTagsCategories(!showTagsCategories);

    };

    const onFinish = (values) => {
        values.categories = selectedCategories;
        console.log("value", values);
        dispatch(fetchAddPost(values));
    };
    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Form
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                    >
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Card type="inner" title={<span> <DownOutlined /> Categories</span>} onClick={handleTitleClick} />
                            {showTagsCategories && (
                                <Card>
                                    <Space size={[0, 10]} wrap>
                                        {CategoriesJSX}
                                    </Space>
                                </Card>
                            )}
                        </Col>

                    </Row>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Space>
        </>
    );
}

export default NewPost;
