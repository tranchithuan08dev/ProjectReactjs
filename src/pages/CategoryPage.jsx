import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArticleItem from '../components/ArticleItem';
import Button from '../components/shared/Button';
import MainTitle from '../components/shared/MainTitle';
import { fetchPostsByCategory } from '../store/categoriesSlice';

function CategoryPage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const { list: posts, currentPage, totalPages, total } = useSelector((state) => state.CATEGORY.postsByCategory);
  const hasLoadMore = currentPage < totalPages;

  useEffect(() => {
    dispatch(fetchPostsByCategory({ page: 1, slug }));
  }, [slug]);

  useEffect(() => {
    setLoading(false);
  }, [posts]);

  function handleLoadMore() {
    setLoading(true);
    dispatch(fetchPostsByCategory({ page: currentPage + 1, slug: slug }));
  }

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle isSearchPage>
          {total} Results found for category {slug}
        </MainTitle>
        {posts.map((item) => (
          <div key={item.id} className="tcl-row tcl-jc-center">
            <div className="tcl-col-12 tcl-col-md-8">
              <ArticleItem data={item} isStyleCard />
            </div>
          </div>
        ))}
        <div className="text-center">
          {hasLoadMore && (
            <Button type="primary" size="large" loading={loading} onClick={handleLoadMore}>
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
