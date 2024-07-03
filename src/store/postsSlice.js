import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mappingPostData } from '../helpers';
import postService from '../services/postService';
import { fetchParentComment } from './commentSlices';

const name = 'posts';
const initialState = {
  postsLatest: [],

  postsPopular: [],

  postPaging: {
    list: [],
    currentPage: 1,
    totalPages: 0,
    total: 0,
  },
  postsDetail: [],
  postRelated: [],
  postDetailId: [],

};

export const fetchPostsLatest = createAsyncThunk(`${name}/fetchPostsLatest`, async () => {
  const response = await postService.getLatest();
  const posts = response.data.map(mappingPostData);
  return posts;
});

export const fetchPostsPopular = createAsyncThunk(`${name}/fetchPostsPopular`, async () => {
  const response = await postService.getPopular();
  const posts = response.data.map(mappingPostData);
  return posts;
});
export const fetchAddPost = createAsyncThunk(`${name}/fetchAddPost`, async (data) => {
  try {
    const response = await postService.AddPost(data);
    return response;
  } catch (error) {
    console.log(error);
  }

});
export const fetchPostDetailID = createAsyncThunk(`${name}/fetchPostDetailID`, async (id) => {
  try {
    const response = await postService.getPostDetailId(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }

});


export const fetchPostsPaging = createAsyncThunk(`${name}/fetchPostsPaging`, async (params = { page: 1 }) => {
  const response = await postService.getPaging(params);
  const totalPages = parseInt(response.headers['x-wp-totalpages']);
  const total = parseInt(response.headers['x-wp-total']);
  const posts = response.data.map(mappingPostData);
  return { posts, currentPage: params.page, totalPages, total };
});

export const fetchPostsDetail = createAsyncThunk(`${name}/fetchPostsDetail`, async (params = {}, thunkAPI) => {
  const response = await postService.getPostDetail(params);
  const posts = response.data.map(mappingPostData);
  const author = posts[0].author;
  const currentId = posts[0].id;
  const res = await postService.getPostRelated(params = { author: author, exclude: currentId });
  const { dispatch } = thunkAPI;
  dispatch(fetchParentComment({ page: 1, post: 12 }));
  const postDetailRelated = res.data.map(mappingPostData);
  return { posts, postDetailRelated };
});



const postsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsLatest.fulfilled, (state, action) => {
      state.postsLatest = action.payload;
    });

    builder.addCase(fetchPostsPopular.fulfilled, (state, action) => {
      state.postsPopular = action.payload;
    });

    builder.addCase(fetchPostsPaging.fulfilled, (state, action) => {
      const payload = action.payload;
      state.postPaging = {
        ...payload,
        list: payload.currentPage === 1 ? payload.posts : [...state.postPaging.list, ...payload.posts],
      };
    });

    builder.addCase(fetchPostsDetail.fulfilled, (state, action) => {
      state.postsDetail = action.payload.posts;
      state.postRelated = action.payload.postDetailRelated;
    });
    builder.addCase(fetchPostDetailID.fulfilled, (state, action) => {
      state.postDetailId = action.payload;
    });

  },
});

export default postsSlice.reducer;
