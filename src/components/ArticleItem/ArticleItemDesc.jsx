/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';

function ArticleItemDesc(props) {
  const { desc } = props;
  let descRender = desc.replace('<p>', '');
  descRender = descRender.replace('</p>', '');

  const { q: keyword } = useGetSearchParams('keyword');

  if (keyword) {
    const regex = new RegExp(keyword, 'ig');
    descRender = descRender.replaceAll(regex, (match) => {
      return `<mark>${match}</mark>`;
    });
  }

  const markup = { __html: descRender };

  return <p className="article-item__desc" dangerouslySetInnerHTML={markup} />;
}

export default ArticleItemDesc;
