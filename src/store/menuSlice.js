import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import menuService from '../services/menuService';
import { mappingMenu } from '../helpers';


const name = 'menu';
const initialState = {
    list: [],
};


export const fetchMenuList = createAsyncThunk(`${name}/fetchMenuList`, async () => {
    try {
        const response = await menuService.getAll();
        const menuItems = response.data.items.map(mappingMenu)
        return menuItems
    } catch (error) {
        console.log(error);
    }



});

// SLICE
const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMenuList.fulfilled, (state, action) => {
            state.list = action.payload
        });

    },
});

export default categoriesSlice.reducer;
