/* eslint-disable no-unused-vars */
import React from 'react';

// eslint-disable-next-line react/prop-types
function ArticleItemAvatar({ authorAvatar }) {
  return (
    <div className="article-item__author-image">
      <a aria-label="John Doe" href="#">
        <img src={authorAvatar ? authorAvatar : '/assets/images/john-doe.png'} alt="john-doe" />
      </a>
    </div>
  );
}

export default ArticleItemAvatar;
