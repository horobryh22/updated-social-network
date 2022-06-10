import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PhotosUserType} from '../profile/profile-reducer';
import {changeUserFollowStatus, getUsers, isError} from '../../thunks/thunks';

export type UsersTestType = {
    name: string
    id: number
    photos: PhotosUserType
    status: null | string
    followed: boolean
}
export type UsersPageType = typeof initialState;

const initialState = {
    users: [] as Array<UsersTestType>,
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
                if (!action.payload.data.resultCode) {
                    state.users = state.users.map(u => u.id === action.payload.id
                        ? {...u, followed: !u.followed}
                        : u);
                }
                state.isChangingFollowStatus = state.isChangingFollowStatus.filter(id => id !== action.payload.id);
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
});

export default usersSlice.reducer;
export const {changeCurrentPage, addIdToChangingFollowStatusArray} = usersSlice.actions;
