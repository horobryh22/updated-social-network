import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PhotosUserType} from '../profile/profile-reducer';
import {GetUsersResponseType, profileAPI, usersAPI} from '../../../api/api';
import {RootState} from '../../store';

export type UserDataType = {
    name: string
    id: number
    photos: PhotosUserType
    status: null | string
    followed: boolean
}

export type UsersPageType = typeof initialState;

const initialState = {
    users: [] as Array<UserDataType>,
    pageSize: 5,
    usersCount: 0,
    currentPage: 1,
    isFetching: false,
    isChangingFollowStatus: [] as Array<number>
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changeCurrentPage: (state: UsersPageType, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        addIdToChangingFollowStatusArray: (state: UsersPageType, action: PayloadAction<number>) => {
            state.isChangingFollowStatus.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.items;
                state.usersCount = action.payload.totalCount;
                state.isFetching = false;
            })
            .addCase(getUsers.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(changeUserFollowStatus.fulfilled, (state, action) => {
                state.users = state.users.map(u => u.id === action.payload.id
                    ? {...u, followed: action.payload.followed}
                    : u)

                state.isChangingFollowStatus = state.isChangingFollowStatus.filter(id => id !== action.payload.id);
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
});


export const getUsers = createAsyncThunk<GetUsersResponseType, number, { state: RootState, rejectValue: string }>(
    'users/getUsers',
    async (page, {getState, rejectWithValue, dispatch}) => {
        try {
            dispatch(changeCurrentPage(page));
            return await usersAPI.getUsers(5, page);
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('getUsers: ' + err.message);
        }
    }
)


type changeUserFollowIncomingDataType = {
    id: number
    followed: boolean
}

type changeUserFollowReturnValueType = {
    id: number
    followed: boolean
}

export const changeUserFollowStatus = createAsyncThunk<changeUserFollowReturnValueType, changeUserFollowIncomingDataType>(
    'users/changeUserFollowStatus',
    async ({id, followed}, {rejectWithValue, dispatch}) => {
        dispatch(addIdToChangingFollowStatusArray(id));

        if (!followed) {
            const data = await profileAPI.changeFollowStatus(id, 'post');
            return (!data.resultCode) ? {id, followed: true} : rejectWithValue('User was not added to friends');

        } else {
            const data = await profileAPI.changeFollowStatus(id, 'delete');
            return (!data.resultCode) ? {id, followed: false} : rejectWithValue('User was not added to friends');
        }
    }
);

export const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
}

export default usersSlice.reducer;
export const {changeCurrentPage, addIdToChangingFollowStatusArray} = usersSlice.actions;