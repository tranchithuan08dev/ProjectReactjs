import API from './api';

const menuService = {
  getAll: function () {
    return API.call().get('/menus/v1/menus/main-menu-vi', {
    });
  },

};

export default menuService;
