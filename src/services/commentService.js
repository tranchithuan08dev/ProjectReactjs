import API from './api';

const commentService = {

    getAllComments: function (inputParams = {}) {
        return API.call().get('wp/v2/comments', {
            params: {
                page: 1,
                order: 'asc',
                ...inputParams,
            },
        });
    },

    getCommnent: function (params = {}) {
        return this.getAllComments({
            per_page: 3,
            parent: 0,
            ...params,
        })
    },

    getChildComments: function (params = {}) {
        return this.getAllComments({
            ...params,
        })
    },

    postsNewComments: function (data) {
        return API.callWithToken().post('/wp/v2/comments', data);
    },

};

export default commentService;
