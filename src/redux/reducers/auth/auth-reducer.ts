import {UserProfileType} from '../profile/profile-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {becomeAuthUser, getAuthUserProfile, isError} from '../../thunks/thunks';

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
            .addCase(becomeAuthUser.fulfilled, (state, action) => {
                state.userData = action.payload.data
                state.isAuth = true;
            })
            .addCase(getAuthUserProfile.fulfilled, (state, action) => {
                state.currentAuthUser = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
})

export default authSlice.reducer;