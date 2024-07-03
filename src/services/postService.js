import API from './api';

const postService = {
  getAll: function (inputParams = {}) {
    return API.call().get('wp/v2/posts', {
      params: {
        page: 1,
        lang: 'vi',
        ...inputParams,
      },
    });
  },
  getLatest: function () {
    return this.getAll({
      per_page: 3,
    });
  },
  getPopular: function () {
    return this.getAll({
      per_page: 3,
      orderby: 'post_views',
    });
  },
  getGeneral: function (params = {}) {
    return this.getAll({
      per_page: 2,
      ...params,
    });
  },
  getSearch: function (params = {}) {
    return this.getAll({
      per_page: 1,
      ...params,
    });
  },
  getPaging: function (params = {}) {
    return this.getAll({
      per_page: 2,
      ...params,
    });
  },
  getByCategory: function (params = {}) {
    return this.getAll({
      per_page: 1,
      ...params,
    });
  },
  getPostDetail: function (params = {}) {
    return this.getAll({
      ...params,
    })
  },
  getPostDetailId: function (id) {
    return API.callWithToken().get(`wp/v2/posts/${id}`);
  },
  getPostRelated: function (params = {}) {
    return this.getAll({
      per_page: 3,
      ...params,
    })
  },

  AddPost: function (data) {
    return API.callWithToken().post('wp/v2/posts', { ...data, status: 'publish', lang: 'vi' });
  },
};

export default postService;
