/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

function ArticleItemInfoRight({ authorNickname, publishedDate }) {
  return (
    <div className="article-item__info-right">
      <div className="article-item__author-name">
        <a href="#">
          <strong>{authorNickname}</strong>
        </a>
      </div>
      <div className="article-item__datetime">
        <div className="date">{dayjs(publishedDate).fromNow()}</div>
      </div>
    </div>
  );
}

export default ArticleItemInfoRight;
