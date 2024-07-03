
import { Button, Card, Drawer, Flex, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsDetail, fetchPostsPopular } from '../../../store/postsSlice';
import { useEffect, useState } from 'react';
import NewPost from '../NewPost';


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

    const [slug, setSlug] = useState('');
    const [tagColors, setTagColors] = useState(initialTagStates);

    const postsPageAdmin = useSelector((state) => state.POST.postsPopular);
    useEffect(() => {
        dispatch(fetchPostsPopular());
    }, []);

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
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
                {/* <NewPost /> */}
            </Drawer>
        </>
    );
}
    ;
export default PostPage;