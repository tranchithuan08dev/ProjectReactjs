/* eslint-disable react/prop-types */
import ArticleRelated from "../ArticleItem/ArticleRelated"

// eslint-disable-next-line react/prop-types
function PostDetailRelatedPosts({ data }) {
  return (
    <div className="related-post">
      <h2 className="related-post__head">Related Posts</h2>
      {data.map((item, index) => (<ArticleRelated data={item} key={index} />)
      )}


    </div>
  )
}

export default PostDetailRelatedPosts