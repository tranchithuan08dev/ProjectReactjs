import PostDetailAuthor from "./PostDetailAuthor"
import PostDetailRelatedPosts from "./PostDetailRelatedPosts"

// eslint-disable-next-line react/prop-types
function PostDetailSidebar({ data }) {
  return (
    <div className="post-detail__side">
      <PostDetailAuthor />
      <div className="spacing" />
      <PostDetailRelatedPosts data={data} />
    </div>
  )
}

export default PostDetailSidebar