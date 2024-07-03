/* eslint-disable no-unused-vars */
import React from 'react';

function ArticleItemThumb({ thumb }) {
  return (
    <div className="article-item__thumbnail">
      <a href="#">
        <img src={thumb} alt="assets/images/blog-1.jpg" />
      </a>
    </div>
  );
}

export default ArticleItemThumb;
