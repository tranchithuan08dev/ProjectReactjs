/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ArticleGeneral from '../components/ArticleGeneral';
import ArticleLatest from '../components/ArticleLatest';
import ArticlePopular from '../components/ArticlePopular';
import { fetchPostsLatest, fetchPostsPaging, fetchPostsPopular } from '../store/postsSlice';

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsLatest());
    dispatch(fetchPostsPopular());
    dispatch(fetchPostsPaging());
  }, []);

  return (
    <>
      <ArticleLatest />
      <ArticlePopular />
      <ArticleGeneral />
    </>
  );
}

export default HomePage;
