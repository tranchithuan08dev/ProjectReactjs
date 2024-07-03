/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function ArticleItemTitle({ title, slug }) {
  return (
    <h2 className="article-item__title">
      <Link to={`/post/${slug}`}>
        {title}
      </Link>
    </h2>
  );
}

export default ArticleItemTitle;
