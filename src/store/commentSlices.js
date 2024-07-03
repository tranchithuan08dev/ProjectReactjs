import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mappingPostComments } from '../helpers';
import commentService from '../services/commentService';



const name = 'post';
const initialState = {
    parentComment: {
        list: [],
        currentPage: 1,
        totalPages: 0,
        total: 0,
    },

    childComment: {

    },
};


export const fetchParentComment = createAsyncThunk(`${name}/fetchparentComment`, async (params = { page: 1 }) => {
    const response = await commentService.getCommnent(params);
    const totalPages = parseInt(response.headers['x-wp-totalpages']);
    const total = parseInt(response.headers['x-wp-total']);
    const posts = response.data.map(mappingPostComments);
    return { posts, currentPage: params.page, totalPages, total };
});

export const fetchChildtComment = createAsyncThunk(`${name}/fetchChildtComment`, async (params = {}) => {
    const response = await commentService.getChildComments(params);
    const totalPages = parseInt(response.headers['x-wp-totalpages']);
    const total = parseInt(response.headers['x-wp-total']);
    const posts = response.data.map(mappingPostComments);
    return { list: posts, currentPage: params.page, totalPages, total };
});


export const fetchNewComment = createAsyncThunk(`${name}/fetchNewComment`, async (params = {}) => {
    const response = await commentService.postsNewComments(params);
    const postNewComments = mappingPostComments(response.data);
    return postNewComments;

});

export const fetchNewChildComment = createAsyncThunk(`${name}/fetchNewChildComment`, async (params = { page: 1 }) => {
    const response = await commentService.postsNewComments(params);
    const postNewComments = mappingPostComments(response.data);
    return postNewComments;
});
// SLIC
const commentSlices = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchParentComment.fulfilled, (state, action) => {
            const payload = action.payload;

            state.parentComment = {
                ...payload,
                list: payload.currentPage === 1 ? payload.posts : [...state.parentComment.list, ...payload.posts],
            };
        });

        builder.addCase(fetchChildtComment.fulfilled, (state, action) => {
            const payload = action.payload;
            const parentId = payload.list[0].parent;
            const isExist = state.childComment[parentId];
            state.childComment = {
                ...state.childComment,
                [parentId]: isExist ? {
                    ...state.childComment[parentId],
                    ...payload,
                    list: [...state.childComment[parentId].list, ...payload.list]
                }
                    : payload,
            }
        });

        builder.addCase(fetchNewComment.fulfilled, (state, action) => {
            const payload = action.payload;
            state.parentComment.list.unshift(payload);
        });
        // builder.addCase(fetchNewChildComment.fulfilled, (state, action) => {
        //     const payload = action.payload;
        //     state.childComment.unshift(payload);
        // });
        builder.addCase(fetchNewChildComment.fulfilled, (state, action) => {
            const payload = action.payload;
            const parentId = payload.parent;
            const isExist = state.childComment[parentId];
            state.childComment = {
                ...state.childComment,
                [parentId]: isExist
                    ? {
                        ...state.childComment[parentId],
                        list: [payload, ...state.childComment[parentId].list],
                    }
                    : { list: [payload] },
            };
        });
    },
});

export default commentSlices.reducer;
