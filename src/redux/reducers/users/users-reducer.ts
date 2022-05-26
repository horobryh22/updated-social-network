import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type PhotosType = {
    small: null | string
    large: null | string
}
export type UsersTestType = {
    name: string
    id: number
    photos: PhotosType
    status: null | string
    followed: boolean
}
export type UsersPageType = typeof initialState;

const initialState = {
    users: [] as Array<UsersTestType>,
    pageSize: 5,
    usersCount: 0,
    currentPage: 1
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changeFollowed: (state: UsersPageType, action: PayloadAction<number>) => {
            state.users = state.users
                .map(u => u.id === action.payload
                    ? {...u, followed: !(state.users.find(el => el.id === action.payload)?.followed)}
                    : u);
        },
        setUsers: (state: UsersPageType, action: PayloadAction<Array<UsersTestType>>) => {
            state.users = [...action.payload];
        },
        changeCurrentPage: (state: UsersPageType, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalCount: (state: UsersPageType, action: PayloadAction<number>) => {
            state.usersCount = action.payload;
        }
    }
});

export default usersSlice.reducer;
export const {changeFollowed, changeCurrentPage, setUsers, setTotalCount} = usersSlice.actions;