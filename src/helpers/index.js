export function mappingPostData(item) {
  return {
    id: item.id,
    title: item.title.rendered,
    thumb: item.featured_media_url,
    desc: item.excerpt.rendered,
    authorAvatar: item.author_data.avatar,
    authorNickname: item.author_data.nickname,
    publishedDate: item.date,
    categoriesId: item.categories,
    slug: item.slug,
    content: item.content.rendered,
    author: item.author,
  };
}

export function mappingPostComments(item) {
  return {
    id: item.id,
    comment: item.content.rendered,
    parent: item.parent,
    commentReply: item.comment_reply_count,
    authorName: item.author_name,
  }
}

export function mappingMenu(item) {
  let childItems = [];
  if (item.child_items) {
    childItems = item.child_items.map(mappingMenu)
  }
  return {
    id: item.ID,
    title: item.title,
    childItems: childItems
  };
}

// export function mappingCategoryData(item) {
//   return {
//     id: item.id,
//     name: item.name,
//     slug: item.slug
//   };
// }

export function mappingCategoryData(items) {
  const data = {};
  items.forEach((element) => {
    data[element.id] = {
      id: element.id,
      name: element.name,
      slug: element.slug,
    };
  });

  return data;
}