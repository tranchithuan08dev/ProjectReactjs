// eslint-disable-next-line no-unused-vars
import React from 'react';
import ArticleItem from '../ArticleItem';
import MainTitle from '../shared/MainTitle';
import { usePostPaging } from '../../hooks/usePostPaging';

// eslint-disable-next-line no-unused-vars
function ArticleGeneral(props) {
  const { posts, renderButtonLoadMore } = usePostPaging();

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        {/* Main Title */}
        <MainTitle btnLabel="View More" btnProps={{ type: 'default' }}>
          News List
        </MainTitle>
        {/* End Main Title */}
        {/* End Row News List */}
        <div className="tcl-row">
          {posts.map((item) => (
            <div key={item.id} className="tcl-col-12 tcl-col-md-6">
              <ArticleItem isStyleCard isShowAvatar={false} data={item} />
            </div>
          ))}
        </div>
        {/* End Row News List */}
        {/* Btn Loadmore */}
        {renderButtonLoadMore()}


      </div>
    </div>
  );
}

export default ArticleGeneral;
