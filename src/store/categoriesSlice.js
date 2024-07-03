import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService';
import { mappingCategoryData, mappingPostData } from '../helpers';
import postService from '../services/postService';

const name = 'categories';
const initialState = {
  list: null,
  postsByCategory: {
    list: [],
    currentPage: 1,
    totalPages: 0,
    total: 0,
  },
};

export const fetchCategoriesList = createAsyncThunk(`${name}/fetchCategoriesList`, async () => {
  try {
    const response = await categoryService.getAll({ per_page: 100 });
    const categories = mappingCategoryData(response.data);
    return categories;
  } catch (error) {
    console.log(error);
  }

});

export const fetchPostsByCategory = createAsyncThunk(
  `${name}/fetchPostsByCategory`,
  async (params = { slug: '', page: 1 }) => {
    const { slug, page } = params;
    const resCategory = await categoryService.getDetail(slug);
    const category = resCategory.data[0];
    const categoryId = category.id;
    const resPost = await postService.getByCategory({ page, categories: categoryId });
    const posts = resPost.data.map(mappingPostData);
    const totalPages = parseInt(resPost.headers['x-wp-totalpages']);
    const total = parseInt(resPost.headers['x-wp-total']);
    return { posts, currentPage: page, totalPages, total };
  }
);

// SLICE
const categoriesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesList.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchPostsByCategory.fulfilled, (state, action) => {
      const payload = action.payload;
      state.postsByCategory = {
        ...payload,
        list: payload.currentPage === 1 ? payload.posts : [...state.postsByCategory.list, ...payload.posts],
      };
    });
  },
});

export default categoriesSlice.reducer;
