import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {PhotosUserType} from '../profile/profile-reducer';
import {instance, ResponseDataType} from '../auth/auth-reducer';

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
    isFetching: false,
    isChangingFollowStatus: [] as Array<number>
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
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
            .addCase(addUserToFriends.fulfilled, (state, action) => {
                if (!action.payload.data.resultCode) {
                    state.users.map(u => u.id === action.payload.id
                        ? u.followed = !u.followed
                        : u);
                }
            })
            .addCase(removeUserFromFriends.fulfilled, (state, action) => {
                if (!action.payload.data.resultCode) {
                    state.users.map(u => u.id === action.payload.id
                        ? u.followed = !u.followed
                        : u);
                }
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

        const response = await instance.get(`users`, {
            params: {
                count: pageSize,
                page: currentPage
            }
        });

        return response.data;
    }
)

export const addUserToFriends = createAsyncThunk<{ data: ResponseDataType, id: number }, number, { rejectValue: string }>(
    'users/addUserToFriends',
    async (id, {rejectWithValue}) => {
        const response = await instance.post(`/follow/${id}`);
        return {data: response.data, id}
    }
);

export const removeUserFromFriends = createAsyncThunk<{ data: ResponseDataType, id: number }, number, { rejectValue: string }>(
    'users/removeUserFromFriends',
    async (id, {rejectWithValue}) => {
        const response = await instance.delete(`/follow/${id}`)
        return {data: response.data, id}
    }
);


export default usersSlice.reducer;
export const {changeCurrentPage} = usersSlice.actions;
