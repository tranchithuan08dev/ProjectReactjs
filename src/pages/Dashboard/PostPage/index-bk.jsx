
import { Button, Card, Drawer, Flex, Space, Typography, Col, Row, Tag, Input, Image, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsDetail, fetchPostsPopular } from '../../../store/postsSlice';
import { useEffect, useState } from 'react';
import {
    CheckCircleOutlined,
    DownOutlined,
    MinusCircleOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import ReactQuill from 'react-quill';

const cardStyle = {
    width: 520,
};
const imgStyle = {
    width: '190px',
    height: '190px',
};

const PostPage = () => {
    const dispatch = useDispatch();
    const initialTagStates = Array(5).fill('default');
    const [editorValue, setEditorValue] = useState('');
    const [slug, setSlug] = useState('');
    const [tagColors, setTagColors] = useState(initialTagStates);
    const [tagColorsTags, settagColorsTags] = useState(initialTagStates);
    const [showTagsCategories, setShowTagsCategories] = useState(false);
    const [showTag, setShowTag] = useState(false);
    const postsPageAdmin = useSelector((state) => state.POST.postsPopular);
    const PostDetail = useSelector((state) => state.POST.postsDetail);
    const postPage = useSelector((state) => state.CATEGORY.list);
    console.log("postDetail", PostDetail);

    useEffect(() => {
        dispatch(fetchPostsPopular());
    }, []);

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
    };
    const handleEditorChange = (value) => {
        setEditorValue(value);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleGetSlug = (value) => {
        setSlug(value);

        // if (PostDetail) { console.log("ín", PostDetail[0]?.categoriesId); }
        [9, 10].map((index) => handleCategories(index));

    };

    useEffect(() => {
        if (slug) {
            dispatch(fetchPostsDetail({ slug }));
        }
    }, [slug]);



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
            {postsPageAdmin.map((item) => (
                <Space key={item.id}>
                    <Card
                        hoverable
                        style={cardStyle}
                        bodyStyle={{
                            padding: 0,
                            overflow: 'hidden',
                        }}
                    >
                        <Flex justify="space-between">
                            <img
                                alt="avatar"
                                src={item.thumb}
                                style={imgStyle}
                            />
                            <Flex
                                vertical
                                align="flex-end"
                                justify="space-between"
                                style={{
                                    padding: 32,
                                }}
                                onClick={showLargeDrawer}
                            >
                                <Button type="primary" onClick={() => handleGetSlug(item.slug)} >
                                    Chỉnh sửa
                                </Button>
                                <Typography.Title level={3}>
                                    {item.title}
                                </Typography.Title>
                            </Flex>

                        </Flex>
                    </Card>
                </Space>
            ))}

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

                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Card type="inner" title="Tiêu đề">
                        {PostDetail.map((item, index) =>
                            (<Input key={index} type="text" placeholder="Điền tiêu đề..." bordered={false} value={item.title} />))}

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
            </Drawer>
        </>
    );
}
    ;
export default PostPage;