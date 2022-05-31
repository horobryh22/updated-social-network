import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../../store';
import {PhotosUserType} from '../profile/profile-reducer';

type DataType = {
    error: null | string
    items: Array<UsersTestType>
    totalCount: number
}
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
    error: '',
    isFetching: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changeFollowed: (state: UsersPageType, action: PayloadAction<number>) => {
            state.users.map(u => u.id === action.payload
                ? u.followed = !u.followed
                : u);
        },
        changeCurrentPage: (state: UsersPageType, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
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
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
            })
    }
});

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
}

export const getUsers = createAsyncThunk<DataType, void, { rejectValue: string, state: RootState }>(
    'users/getUsers',
    async (_, {rejectWithValue, getState}) => {

        const {pageSize, currentPage} = getState().users;
        const response = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${currentPage}`);

        if (response.status !== 200) {
            return rejectWithValue('Can\'t get tasks. Server error');
        }

        return response.data as DataType;
    }
)

export default usersSlice.reducer;
export const {changeFollowed, changeCurrentPage} = usersSlice.actions;
