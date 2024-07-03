import { useParams } from 'react-router-dom';
import PostDetailContent from '../components/PostDetail/PostDetailContent';
import PostDetailHead from '../components/PostDetail/PostDetailHead';
import PostDetailSidebar from '../components/PostDetail/PostDetailSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPostsDetail } from '../store/postsSlice';

function PostDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch()
  const PostDetail = useSelector((state) => state.POST.postsDetail);
  const PostRelated = useSelector((state) => state.POST.postRelated);
  useEffect(() => {
    dispatch(fetchPostsDetail({ slug }))
  }, [slug])

  return (
    <main className="post-detail">
      <div className="spacing" />
      {PostDetail.map((item, index) => (<PostDetailHead key={index} data={item} />))}
      <div className="spacing" />

      <div className="post-detail__fluid">
        <div className="tcl-container">
          <div className="post-detail__wrapper">
            {PostDetail.map((item, index) => (<PostDetailContent key={index} data={item} />))}
            <PostDetailSidebar data={PostRelated} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostDetailPage;
