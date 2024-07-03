/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../shared/Button';
import { Link } from 'react-router-dom';

function ArticleItemCategories(props) {
  const { categoriesId } = props;
  const categories = useSelector((state) => state.CATEGORY.list);
  return (
    <ul className="article-item__categories">
      {/* {categories.length > 0 &&
        categoriesId.map((item) => {
          const category = categories.find((categoryItem) => categoryItem.id === item);
          return (
            <li key={item}>
              <Link to={`/category/${category.slug}`}>
                <Button type="category">{category.name}</Button>
              </Link>
            </li>
          );
        })} */}
    </ul>
  );
}

export default ArticleItemCategories;
