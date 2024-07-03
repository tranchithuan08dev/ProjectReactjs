import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import mediaService from "../services/mediaService";
const name = "auth";

const initialState = {
    token: null,
    currentUser: null,
};
export const Login = createAsyncThunk(`${name}/Login`, async (params = {}) => {
    try {
        const res = await authService.login(params);
        const token = res.data.token;
        const currentUser = await authService.fetchWithMe(token)
        const currenInfor = currentUser.data;
        return {
            ok: true,
            data: {
                token,
                currenInfor,
            }
        };
    } catch (error) {
        return {
            ok: false,
            message: 'Thông tin đăng nhập của bạn không đúng!'
        }
    }
});

export const Resgiter = createAsyncThunk(`${name}/Resgiter`, async (params = {}) => {
    try {
        const response = await authService.resgiter(params)
        const res = await authService.login({ username: params.username, password: params.password });
        const token = res.data.token;
        const currentUser = await authService.fetchWithMe(token)
        const currenInfor = currentUser.data;
        return {
            ok: true,
            data: {
                token,
                currenInfor,
            }
        };
    } catch (error) {
        return {
            ok: false,
            message: 'Thông tin đăng nhập của bạn không đúng!'
        }
    }
});

export const fetchMe = createAsyncThunk(`${name}/fetchMe`, async (token) => {
    try {
        if (!token) token = localStorage.getItem("ACCESS_TOKKEN")
        const currentUser = await authService.fetchWithMe(token)
        const currenInfor = currentUser.data;
        return {
            ok: true,
            data: {
                token,
                currenInfor,
            }
        };
    } catch (error) {
        localStorage.removeItem("ACCESS_TOKKEN")
        return {
            ok: false,
        }

    }
});

// export const fetchChangePassWord = createAsyncThunk(`${name}/fetchChangePassWord`, async (params = {}) => {
//     const response = await authService.changePassWord(params);
//     console.log(response);
//     return;
// });

export const fetchUpDateProfile = createAsyncThunk(`${name}/fetchUpDateProfile`, async (params = {}) => {
    try {
        const mediaResponse = await mediaService.upload(params.formData);

        if (mediaResponse.status === 201) {
            params.data.simple_local_avatar = { media_id: mediaResponse.data.id };
        }

        const response = await authService.UpDateProfile(params.data);
        return response;
    } catch (error) {
        console.log(error);
    }

});

const authSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action) => {
            if (action.payload.ok) {
                state.token = action.payload.data.token;
                localStorage.setItem("ACCESS_TOKKEN", state.token);
                state.currentUser = action.payload.data.currenInfor;
            }
        });
        builder.addCase(fetchMe.fulfilled, (state, action) => {
            if (action.payload.ok) {
                state.token = action.payload.data.token;
                state.currentUser = action.payload.data.currenInfor;
            }
        });
        builder.addCase(Resgiter.fulfilled, (state, action) => {
            if (action.payload.ok) {
                state.token = action.payload.data.token;
                localStorage.setItem("ACCESS_TOKKEN", state.token);
                state.currentUser = action.payload.data.currenInfor;
            }
        });
        builder.addCase(fetchUpDateProfile.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });

    },
})

export default authSlice.reducer;