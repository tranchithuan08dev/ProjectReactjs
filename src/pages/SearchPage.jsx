import { useEffect, } from 'react';
import { useDispatch, } from 'react-redux';
import ArticleItem from '../components/ArticleItem';
import MainTitle from '../components/shared/MainTitle';
import { useGetSearchParams } from '../hooks/useGetSearchParams';
import { fetchPostsPaging } from '../store/postsSlice';
import { usePostPaging } from '../hooks/usePostPaging';

function SearchPage() {
  const dispatch = useDispatch();
  const { q: keyword } = useGetSearchParams('keyword');
  const extraParams = { per_page: 1, search: keyword };
  const { posts, renderButtonLoadMore, total } = usePostPaging(extraParams);



  useEffect(() => {
    dispatch(fetchPostsPaging({ page: 1, ...extraParams }));
  }, [keyword]);



  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle isSearchPage>
          {total} Results found for "{keyword}"
        </MainTitle>
        {posts.map((item) => (
          <div key={item.id} className="tcl-row tcl-jc-center">
            <div className="tcl-col-12 tcl-col-md-8">
              <ArticleItem data={item} isStyleCard isShowDesc />
            </div>
          </div>
        ))}
        {renderButtonLoadMore()}
      </div>
    </div>
  );
}

export default SearchPage;
