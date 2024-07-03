import { useState } from 'react';
import {
    CheckCircleOutlined,
    DownOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Tag, Space, Input, Button, Image } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useSelector } from 'react-redux';

function NewPost() {
    const initialTagStates = Array(5).fill('default');
    const postPage = useSelector((state) => state.CATEGORY.list);
    console.log("postPage", postPage);
    const [tagColors, setTagColors] = useState(initialTagStates);
    const [tagColorsTags, settagColorsTags] = useState(initialTagStates);
    const [editorValue, setEditorValue] = useState('');
    const [showTagsCategories, setShowTagsCategories] = useState(false);
    const [showTag, setShowTag] = useState(false);


    const handleCategories = (index) => {
        const newTagColors = [...tagColors];
        newTagColors[index] = newTagColors[index] === 'default' ? 'success' : 'default';
        setTagColors(newTagColors);
    };

    const handleTags = (index) => {
        const newTagColors = [...tagColorsTags];
        newTagColors[index] = newTagColors[index] === 'default' ? 'success' : 'default';
        settagColorsTags(newTagColors);
    };

    const handleTitleClick = () => {
        setShowTagsCategories(!showTagsCategories);
        setShowTag(false);
    };

    const handleClickTag = () => {
        setShowTag(!showTag);
    };

    const handleEditorChange = (value) => {
        setEditorValue(value);
    };
    const [avatarUrl, setAvatarUrl] = useState("");
    const [file, setFile] = useState(null);


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
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card type="inner" title="Tiêu đề">
                    <Input placeholder="Điền tiêu đề..." bordered={false} />
                </Card>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card type="inner" title={<span> <DownOutlined /> Categories</span>} onClick={handleTitleClick} />
                        {showTagsCategories && (
                            <Card>
                                <Space size={[0, 10]} wrap>
                                    {postPage.map((item) => (
                                        <Tag
                                            key={item.id}
                                            icon={tagColors[item.id] === 'default' ? <MinusCircleOutlined /> : <CheckCircleOutlined />}
                                            color={tagColors[item.id]}
                                            onClick={() => handleCategories(item.id)}
                                        >
                                            {item.name}
                                        </Tag>
                                    ))}
                                </Space>
                            </Card>
                        )}
                    </Col>
                    <Col span={12}>
                        <Card type="inner" title={<span> <DownOutlined /> Tags</span>} onClick={handleClickTag} />
                        {showTag && (
                            <Card>
                                <Space size={[0, 10]} wrap>
                                    {postPage.map((item) => (
                                        <Tag
                                            key={item.id}
                                            icon={tagColorsTags[item.id] === 'default' ? <MinusCircleOutlined /> : <CheckCircleOutlined />}
                                            color={tagColorsTags[item.id]}
                                            onClick={() => handleTags(item.id)}
                                        >
                                            {item.slug}
                                        </Tag>
                                    ))}
                                </Space>
                            </Card>
                        )}
                    </Col>
                </Row>

                <ReactQuill style={{ marginTop: '20px', background: 'rgba(0, 0, 0, 0.02)' }} placeholder="Soạn bài viết...." theme="snow" value={editorValue} onChange={handleEditorChange} />
                <Card type="inner" title="Chọn ảnh" extra={<Upload name="file" beforeUpload={beforeUpload} onChange={handleChangeImage}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>} ><Image
                        width={200}
                        src={avatarUrl}
                    />
                </Card>
            </Space>
        </>
    );
}

export default NewPost;
