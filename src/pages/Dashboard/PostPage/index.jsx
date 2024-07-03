import { useEffect, useState } from 'react';
import {
    CheckCircleOutlined,
    DownOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Tag, Space, Input, Form, Button } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddPost, fetchPostDetailID } from '../../../store/postsSlice';
import { useParams } from 'react-router-dom';
function PostPage() {
    let { id } = useParams();
    const categories = useSelector((state) => state.CATEGORY.list);
    const postDetailId = useSelector((state) => state.POST.postDetailId)
    const [showTagsCategories, setShowTagsCategories] = useState(false);
    const dispatch = useDispatch();
    const [selectedCategories, setSelectedCategories] = useState([])
    id = parseInt(id);
    console.log("postid", postDetailId);
    const [form] = Form.useForm();
    const initialValues = {
        title: postDetailId?.title.rendered
    };



    useEffect(() => {
        dispatch(fetchPostDetailID(id))
    }, [id])

    useEffect(() => {
        if (postDetailId) {
            setSelectedCategories(postDetailId.categories);
            form.setFieldsValue({
                title: postDetailId?.title.rendered
            });
        }
    }, [postDetailId])
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
        for (let id in categories) {
            id = parseInt(id)
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

        dispatch(fetchAddPost(values));
    };
    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={initialValues}
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

export default PostPage;
