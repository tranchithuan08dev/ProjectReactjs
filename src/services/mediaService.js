import API from './api';


const mediaService = {
  upload: function (formData) {
    return API.callWithToken().post('/wp/v2/media', formData);
  },
};

export default mediaService;

