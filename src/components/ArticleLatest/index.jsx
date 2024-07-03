/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import ArticleItem from '../ArticleItem';
import MainTitle from '../shared/MainTitle';
import './latest-news-list.css';

function ArticleLatest(props) {
  const postsLatest = useSelector((state) => state.POST.postsLatest);

  return (
    <div className="latest-news section">
      <div className="tcl-container">
        {/* Main Title */}
        <MainTitle>Latest Articles</MainTitle>
        <div className="latest-news__list spacing">
          {postsLatest.map((post) => (
            <div key={post.id} className="latest-news__card">
              <ArticleItem data={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleLatest;
