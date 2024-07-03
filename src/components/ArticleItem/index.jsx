/* eslint-disable react/prop-types */
import cls from 'classnames';
import React from 'react';
import ArticleItemAvatar from './ArticleItemAvatar';
import ArticleItemCategories from './ArticleItemCategories';
import ArticleItemDesc from './ArticleItemDesc';
import ArticleItemInfoRight from './ArticleItemInfoRight';
import ArticleItemStats from './ArticleItemStats';
import ArticleItemThumb from './ArticleItemThumb';
import ArticleItemTitle from './ArticleItemTitle';
import './article-item.css';

function ArticleItem({
  isShowAvatar = true,
  isStyleCard,
  isStyleRow,
  isShowStats,
  isShowCategories,
  isShowDesc,
  data,
}) {
  if (!data) return <></>;

  const { id, title, thumb, desc, authorNickname, authorAvatar, publishedDate, categoriesId, slug } = data;

  const classes = cls('article-item', {
    'style-card': isStyleCard,
    'style-row': isStyleRow,
  });

  return (
    <article className={classes}>
      <ArticleItemThumb thumb={thumb} />
      <div className="article-item__content">
        {isShowStats && <ArticleItemStats />}
        {isShowCategories && <ArticleItemCategories categoriesId={categoriesId} />}
        <ArticleItemTitle title={title} slug={slug} />
        {isShowDesc && <ArticleItemDesc desc={desc} />}
        <div className="article-item__info">
          {isShowAvatar && <ArticleItemAvatar authorAvatar={authorAvatar} />}
          <ArticleItemInfoRight authorNickname={authorNickname} publishedDate={publishedDate} />
        </div>
      </div>
    </article>
  );
}

export default ArticleItem;
