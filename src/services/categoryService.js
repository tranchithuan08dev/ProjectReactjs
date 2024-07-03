import API from './api';

const categoryService = {
  getAll: function (inputParams = {}) {
    return API.call().get('wp/v2/categories', {
      params: {
        ...inputParams,
        page: 1,
        lang: 'vi',
      },
    });
  },
  getDetail: function (slug) {
    return this.getAll({ slug });
  },
};

export default categoryService;
