import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsPaging } from "../store/postsSlice";
import Button from "../components/shared/Button";

export function usePostPaging(extraParams = {}) {
    const { list: posts, currentPage, totalPages, total } = useSelector((state) => state.POST.postPaging);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const hasLoadMore = currentPage < totalPages;
    useEffect(() => {
        setLoading(false);
    }, [posts]);

    function handleLoadMore() {
        setLoading(true);
        dispatch(fetchPostsPaging({ page: currentPage + 1, ...extraParams }));
    }
    function renderButtonLoadMore() {
        return (
            <div className="text-center">
                {hasLoadMore && <Button type="primary" size="large" onClick={handleLoadMore} loading={loading}>
                    Load more
                </Button>}
            </div>
        )
    }

    return {
        posts,
        renderButtonLoadMore,
        total
    };
}

