import {AnyAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ResponseDataType} from '../reducers/auth/auth-reducer';
import {UsersTestType} from '../reducers/users/users-reducer';
import axios from 'axios';
import {UserProfileType} from '../reducers/profile/profile-reducer';

type DataType = {
    error: null | string
    items: Array<UsersTestType>
    totalCount: number
}

export const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd73ac9ac-03b0-4f3d-b9fd-ef31da93967f'
    }
})

export const becomeAuthUser = createAsyncThunk<ResponseDataType, void, {rejectValue: string}>(
    'auth/becomeAuthUser',
    async (_, {rejectWithValue}) => {
       try {
           const response = await instance.get(`auth/me`);
           return response.data;
       } catch (e) {
           const err = e as Error;
           return rejectWithValue('becomeAuthUser: ' + err.message);
       }
    }
);

export const getAuthUserProfile = createAsyncThunk<UserProfileType, number, {rejectValue: string}>(
    'auth/getUserProfile',
    async (id, {rejectWithValue}) => {
       try {
           const response = await instance.get(`profile/${id}`);
           return response.data;
       } catch (e) {
           const err = e as Error;
           return rejectWithValue('getAuthUserProfile: ' + err.message);
       }
    }
);

export const setUserProfile = createAsyncThunk<UserProfileType, string, {rejectValue: string}>(
    'profile/setUserProfile',
    async (id, {rejectWithValue}) => {
        try {
            const response = await instance.get(`profile/${id}`);
            return response.data as UserProfileType;
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('setUserProfile: ' + err.message);
        }
    }
)

export const getUsers = createAsyncThunk<DataType, void, { state: RootState, rejectValue: string }>(
    'users/getUsers',
    async (_, {getState, rejectWithValue}) => {
        try {
            const {pageSize, currentPage} = getState().users;
            const response = await instance.get(`users`, {
                params: {
                    count: pageSize,
                    page: currentPage
                }
            });

            return response.data;

        } catch (e) {
            const err = e as Error;
            return rejectWithValue('getUsers: ' + err.message);
        }
    }
)

type changeUserFollowIncomingDataType = {
    id: number
    action: 'delete' | 'post'
}

type changeUserFollowReturnValueType = {
    data: ResponseDataType
    id: number
}

export const changeUserFollowStatus = createAsyncThunk<changeUserFollowReturnValueType, changeUserFollowIncomingDataType>(
    'users/removeUserFromFriends',
    async ({id, action}, {rejectWithValue}) => {
        try {
            const response = await instance[action](`/follow/${id}`);
            return {data: response.data, id};
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('changeUserFollowStatus: ' + err.message);
        }
    }
);