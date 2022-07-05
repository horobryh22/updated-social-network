import {UserProfileType} from '../profile/profile-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isError} from '../users/users-reducer';
import {authAPI, AuthUserDataType, profileAPI, ResponseType} from '../../../api/api';
import {FormValuesType} from '../../../components/Login/LoginForm/LoginForm';

type AuthStateType = {
    isAuth: boolean
    authUserData: AuthUserDataType
    authUserProfile: UserProfileType
}

const initialState: AuthStateType = {
    isAuth: false,
    authUserData: {} as AuthUserDataType,
    authUserProfile: {} as UserProfileType
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(me.fulfilled, (state, action) => {
                state.authUserProfile = action.payload.authUserProfile;
                state.authUserData = action.payload.authUserData;
                state.isAuth = true;
            })
            .addCase(logOut.fulfilled, (state, action) => {
                if (!action.payload.resultCode) {
                    state.authUserProfile = {} as UserProfileType;
                    state.authUserData = {} as AuthUserDataType;
                    state.isAuth = false;
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
});

type ResponseMeThunkType = {
    authUserData: AuthUserDataType
    authUserProfile: UserProfileType
}

export const me = createAsyncThunk<ResponseMeThunkType, void, { rejectValue: string }>(
    'auth/me',
    async (_, {rejectWithValue}) => {
        try {
            const data = await authAPI.me();
            if (!data.resultCode) {
                const userData = data.data;
                const profile = await profileAPI.getUserProfile(userData.id);
                return {authUserData: userData, authUserProfile: profile};
            } else {
                throw new Error('You are not authorized');
            }
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('me: ' + err.message);
        }
    }
);


export const logIn = createAsyncThunk<void, FormValuesType, { rejectValue: string }>(
    'auth/login',
    async ({email, password, rememberMe}, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.logIn(email, password, rememberMe);
            if (!response.resultCode) {
                dispatch(me());
            } else {
                throw new Error (response.messages[0]);
            }
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('login: ' + err.message);
        }
    }
);

export const logOut = createAsyncThunk<ResponseType, void, { rejectValue: string }>(
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