/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewChildComment, fetchNewComment } from '../../store/commentSlices';

// eslint-disable-next-line react/prop-types
function CommentForm({ postId, parent, parentId }) {
    const currentsUser = useSelector((state) => (state.AUTH.currentUser));
    const dispatch = useDispatch();
    const [formdata, setFormdat] = useState({
        message: '',
    })

    function handleSubmitComentsForm(e) {
        e.preventDefault();
        if (parent != 0) {
            dispatch(fetchNewComment({ author: currentsUser.id, content: formdata.message, post: postId, parent: 0 }));
        } else {
            dispatch(fetchNewChildComment({ author: currentsUser.id, content: formdata.message, post: postId, parent: parentId }))
        }
    }

    function handleChangeNewsComents(e) {
        const newMessage = e.target.value;
        setFormdat({
            ...formdata,
            message: newMessage,
        });
    }

    return (
        <form className="comments__form" onSubmit={handleSubmitComentsForm}>
            <div className="comments__form--control">
                <div className="comments__section--avatar">
                    <a href="/">
                        <img src="/assets/images/avatar1.jpg" alt="" />
                    </a>
                </div>
                <textarea name='message'
                    value={formdata.message}
                    onChange={handleChangeNewsComents} />
            </div>
            <div className="text-right">
                <button className="btn btn-default" >Submit</button>
            </div>
        </form>
    );
}

export default CommentForm;