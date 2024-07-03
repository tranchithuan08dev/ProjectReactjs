/* eslint-disable react/prop-types */

function PostDetailRichText({ data }) {
  const { desc } = data;
  let descRender = desc.replace('<p>', '');
  descRender = descRender.replace('</p>', '');
  return (
    <div className="rte">
      <p>{descRender}</p>
      <ol>
        <li>First ordered list item</li>
        <li>Another list item
          <ul>
            <li>Unordered sub-list.</li>
          </ul>
        </li>
        <li>Actual numbers don’t matter, just that it’s a number
          <ol>
            <li>Ordered sub-list</li>
          </ol>
        </li>
      </ol>
    </div>
  )
}

export default PostDetailRichText