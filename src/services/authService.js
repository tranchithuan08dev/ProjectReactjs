import API from './api';

const authService = {
    login: function (data) {
        return API.call().post('/jwt-auth/v1/token', data);
    },

    fetchWithMe: function (token) {
        return API.callWithToken(token).get('/wp/v2/users/me');
    },

    resgiter: function (data) {
        return API.call().post('/wp/v2/users/register', data);
    },
    changePassWord: function (data) {
        return API.callWithToken().put('/wp/v2/users/password', data);
    },

    UpDateProfile: function (data) {
        return API.callWithToken().put('/wp/v2/users/me', data);
    },

};
export default authService;