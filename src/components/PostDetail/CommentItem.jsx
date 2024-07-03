/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChildtComment } from '../../store/commentSlices';
import CommentForm from './CommentForm';

function CommentItem({ data }) {
    // reolace <p>
    let comment = data.comment.replace('<p>', '');
    comment = comment.replace('</p>', '');
    // Call store
    const childComment = useSelector((state) => state.COMMENT.childComment);

    const postsDetail = useSelector((state) => (state.POST.postsDetail));

    const dispatch = useDispatch();
    // show on CommentForm
    const [showReply, setShowReply] = useState(false);

    // filter 
    // const postChildComment = posts.filter((item) => item.parent === data.id);
    const ChildCommentReply = childComment[data.id] || {};
    const { list: postChildComments, currentPage, totalPages, total } = ChildCommentReply;

    const restComments = postChildComments ? data.commentReply - postChildComments.length : data.commentReply;
    console.log("count", data.commentReply);


    function handleShowReply() {
        setShowReply(!showReply);
    }

    function handleComments(e) {
        e.preventDefault();
        dispatch(fetchChildtComment({ parent: data.id, per_page: 5, page: currentPage ? currentPage + 1 : 1 }));
    }

    return (
        <> <ul className="comments">
            <li className="item">
                <div className="comments__section">
                    <div className="comments__section--avatar">
                        <a href="/">
                            <img src="/assets/images/avatar3.jpg" alt="" />
                        </a>
                    </div>
                    <div className="comments__section--content">
                        <a href="/" className="comments__section--user">
                            {data.authorName}
                        </a>
                        <p className="comments__section--time">2 minutes ago</p>
                        <p className="comments__section--text">{comment}</p>
                        <i className="ion-reply comments__section--reply" onClick={handleShowReply}></i>
                    </div>
                </div>
                <div>
                    {showReply && <CommentForm postId={postsDetail[0].id} parent={0} parentId={data.id} />}
                </div>
                {postChildComments && postChildComments.length > 0 && postChildComments.map((item, index) => {
                    let comment = item.comment.replace('<p>', '');
                    comment = comment.replace('</p>', '');
                    return (
                        <div className="comments__section" key={index} style={{ paddingLeft: "30px", paddingTop: "10px" }}>
                            <div className="comments__section--avatar">
                                <a href="/">
                                    <img src="/assets/images/avatar3.jpg" alt="" />
                                </a>
                            </div>
                            <div className="comments__section--content">
                                <a href="/" className="comments__section--user">
                                    {data.authorName}
                                </a>
                                <p className="comments__section--time">2 minutes ago</p>
                                <p className="comments__section--text">{comment}</p>
                            </div>
                        </div>
                    );
                })}
                <div className="comments__hidden">
                    {data.commentReply > 0 && restComments > 0 && <a href="#" onClick={handleComments}><i className="icons ion-ios-undo" /> Xem thêm {restComments} câu trả lời</a>}
                </div>
            </li>
        </ul >

        </>
    );
}

export default CommentItem;