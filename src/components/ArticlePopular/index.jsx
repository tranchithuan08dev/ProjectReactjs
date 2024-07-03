// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector } from 'react-redux';
import ArticleItem from '../ArticleItem';
import MainTitle from '../shared/MainTitle';
import './popular-news-list.css';

function ArticlePopular(props) {
  const postsPopular = useSelector((state) => state.POST.postsPopular);
  console.log('postsPopular', postsPopular);
  return (
    <div className="popular-news section bg-white-blue">
      <div className="tcl-container">
        {/* Main Title */}
        <MainTitle btnLabel="View More" btnProps={{ type: 'default' }}>
          Popular Articles
        </MainTitle>
        {/* End Main Title */}
        <div className="popular-news__list spacing">
          <div className="popular-news__list--left">
            <div className="popular-news__list--row">
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isShowCategories isShowStats isShowDesc data={postsPopular[0]} />
              </div>
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isShowCategories isShowStats isShowDesc data={postsPopular[1]} />
              </div>
            </div>
          </div>
          <div className="popular-news__list--right">
            <div className="popular-news__list--row">
              <div className="popular-news__list--card">
                <ArticleItem isStyleCard isStyleRow isShowCategories isShowStats isShowDesc data={postsPopular[2]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePopular;
