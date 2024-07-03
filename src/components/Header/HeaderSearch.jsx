import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Input from '../shared/Input';

function HeaderSearch(props) {
  const { q } = useGetSearchParams('keyword');

  const [keyword, setKeyword] = useState(q);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?keyword=${keyword}`);
    // window.location.href = `/search?keyword=${keyword}`;
  }

  function handleChangeValue(e) {
    setKeyword(e.target.value);
  }

  return (
    <form action="" method="get" onSubmit={handleSubmit}>
      <Input
        placeholder="Type something to search..."
        type="search"
        value={keyword}
        onChange={handleChangeValue}
        required
      />
    </form>
  );
}

export default HeaderSearch;
