import {UserProfileType} from '../profile/profile-reducer';
import {createSlice} from '@reduxjs/toolkit';
import {becomeAuthUser, getAuthUserProfile} from '../../thunks/thunks';

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
            .addCase(getAuthUserProfile.fulfilled, (state:AuthUserStateType, action) => {
                state.currentAuthUser = action.payload;
            })
            .addCase(getAuthUserProfile.pending, (state) => {

            })
    }
})

export default authSlice.reducer;