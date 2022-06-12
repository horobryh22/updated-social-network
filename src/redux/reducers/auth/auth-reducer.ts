import {UserProfileType} from '../profile/profile-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI, usersAPI} from '../../../api/api';
import {isError} from '../users/users-reducer';

export type AuthUserDataType = {
    id: number
    email: string
    login: string
};

const initialState = {
    currentAuthUserData: {} as UserProfileType,
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginMe.fulfilled, (state, action) => {
                state.currentAuthUserData = action.payload
                state.isAuth = true;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
});

export const loginMe = createAsyncThunk<UserProfileType, void, {rejectValue: string}>(
    'auth/becomeAuthUser',
    async (_, {rejectWithValue}) => {
        try {
            const data = await authAPI.becomeAuthUser();
            return await usersAPI.getUserProfile(data.data.id);
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('becomeAuthUser: ' + err.message);
        }
    }
);

export default authSlice.reducer;