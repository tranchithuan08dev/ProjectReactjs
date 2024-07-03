import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postsSlice';
import categoryReducer from './categoriesSlice';
import menuReducer from './menuSlice'
import authReducer from './authSlice'
import commentReducer from './commentSlices'
const store = configureStore({
  reducer: {
    POST: postReducer,
    CATEGORY: categoryReducer,
    MENU: menuReducer,
    AUTH: authReducer,
    COMMENT: commentReducer,
  },
});

export default store;
