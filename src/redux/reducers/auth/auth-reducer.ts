import {UserProfileType} from '../profile/profile-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isError} from '../users/users-reducer';
import {authAPI, profileAPI, ResponseDataType} from '../../../api/api';
import {FormValuesType} from '../../../components/Login/LoginForm/LoginForm';

export type AuthUserDataType = {
    id: number
    email: string
    login: string
    userId: number
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
            .addCase(logIn.fulfilled, (state, action) => {
                state.currentAuthUserData = action.payload
                state.isAuth = true;
            })
            .addCase(logOut.fulfilled, (state, action) => {
                if (!action.payload.resultCode) {
                    state.isAuth = false;
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
});

export const logIn = createAsyncThunk<UserProfileType, FormValuesType, { rejectValue: string }>(
    'auth/login',
    async ({login, password, rememberMe}, {rejectWithValue}) => {
        try {
            const response = await authAPI.logIn(login, password, rememberMe);
            if (!response.resultCode) {
                return await profileAPI.getUserProfile(response.data.userId);
            } else {
                throw new Error('Login error');
            }
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('login: ' + err.message);
        }
    }
);

export const logOut = createAsyncThunk<ResponseDataType, void, { rejectValue: string }>(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            return await authAPI.logOut();
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('logout: ' + err.message);
        }
    }
);

export default authSlice.reducer;