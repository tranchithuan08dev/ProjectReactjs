/* eslint-disable react/jsx-key */
import { useEffect } from 'react'
import './comments.css'
import { useSelector, useDispatch } from 'react-redux';

import Button from '../shared/Button';
import { fetchParentComment } from '../../store/commentSlices';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm'
function PostDetailComments() {
  const { list: posts, currentPage, totalPages, total } = useSelector((state) => state.COMMENT.parentComment);
  const loadMoreComent = total - totalPages;

  const postsDetail = useSelector((state) => (state.POST.postsDetail));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParentComment())
  }, [])
  function handleLoadMoreComments() {
    dispatch(fetchParentComment({ page: currentPage + 1 }));
  }
  return (
    <div className="post-detail__comments">
      <CommentForm postId={postsDetail[0].id} />
      <p>{totalPages} Comments</p>
      {posts.map((item, index) => (
        <CommentItem key={index} data={item} />
      ))}
      <div className='text-left' style={{ paddingTop: '30px', paddingLeft: '30px' }} >
        <Button onClick={handleLoadMoreComments}>Load more {loadMoreComent}</Button>
      </div>

    </div>
  )
}

export default PostDetailComments