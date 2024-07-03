/* eslint-disable react/prop-types */
import './post-detail.css'
import PostDetailComments from "./PostDetailComments"
import PostDetailRichText from "./PostDetailRichText"
import PostDetailTags from "./PostDetailTags"

function PostDetailContent({ data }) {

  return (
    <div className="post-detail__content">
      <div className="thumbnail">
        <img src={data.thumb} alt="blog-title" />
      </div>
      <div className="content-padding">
        <PostDetailRichText data={data} />

        <PostDetailTags />

        <PostDetailComments />
      </div>
    </div>
  )
}

export default PostDetailContent