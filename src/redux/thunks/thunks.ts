import {createAsyncThunk} from '@reduxjs/toolkit';
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

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd73ac9ac-03b0-4f3d-b9fd-ef31da93967f'
    }
})

export const becomeAuthUser = createAsyncThunk<ResponseDataType, void>(
    'auth/becomeAuthUser',
    async (_,) => {

        const response = await instance.get(`auth/me`);

        return response.data;
    }
);

export const getAuthUserProfile = createAsyncThunk<UserProfileType, number>(
    'auth/getUserProfile',
    async (id) => {

        const response = await instance.get(`profile/${id}`);

        return response.data;
    }
);

export const setUserProfile = createAsyncThunk<UserProfileType, string>(
    'profile/setUserProfile',
    async (id) => {

        const response = await instance.get(`profile/${id}`);

        return response.data as UserProfileType;
    }
)

export const getUsers = createAsyncThunk<DataType, void, { state: RootState }>(
    'users/getUsers',
    async (_, {getState}) => {

        const {pageSize, currentPage} = getState().users;

        const response = await instance.get(`users`, {
            params: {
                count: pageSize,
                page: currentPage
            }
        });

        return response.data;
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
    async ({id, action}) => {
        const response = await instance[action](`/follow/${id}`)
        return {data: response.data, id};
    }
);