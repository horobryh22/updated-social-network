import {UserProfileType} from '../profile/profile-reducer';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export type AuthUserStateType = typeof initialState;
export type AuthUserDataType = {
    id: number
    email: string
    login: string
};

export type ResponseDataType = {
    data: AuthUserDataType
    fieldsErrors: Array<any>
    messages: Array<any>
    resultCode: number
}

const initialState = {
    userData: {} as AuthUserDataType,
    currentAuthUser: {} as UserProfileType,
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(becomeAuthUser.fulfilled, (state:AuthUserStateType, action) => {
                state.userData = action.payload.data
                state.isAuth = true;
            })
            .addCase(getUserProfile.fulfilled, (state:AuthUserStateType, action) => {
                state.currentAuthUser = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {

            })

    }
})

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd73ac9ac-03b0-4f3d-b9fd-ef31da93967f'
    }
})

export const becomeAuthUser = createAsyncThunk<ResponseDataType, void, { rejectValue: string }>(
    'auth/becomeAuthUser',
    async (_, {rejectWithValue}) => {

        const response = await instance.get(`auth/me`);

        return response.data;
    }
);

export const getUserProfile = createAsyncThunk<UserProfileType, number, { rejectValue: string }>(
    'auth/getUserProfile',
    async (id, {rejectWithValue}) => {

        const response = await instance.get(`profile/${id}`);

        return response.data;
    }
);

export default authSlice.reducer;