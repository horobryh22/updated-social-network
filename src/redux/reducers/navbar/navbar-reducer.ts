import {createSlice} from '@reduxjs/toolkit';

export type NavbarType = typeof initialState;
export type NavElementType = {
    id: number
    navElement: string
    to: string
}

const initialState = [
    {navElement: 'Profile', to: 'profile', id: 1},
    {navElement: 'Messages', to: 'dialogs', id: 2},
    {navElement: 'News', to: 'news', id: 3},
    {navElement: 'Music', to: 'music', id: 4},
    {navElement: 'Friends', to: 'friends', id: 5},
    {navElement: 'Settings', to: 'settings', id: 6},
    {navElement: 'Users', to: 'users', id: 7},
] as Array<NavElementType>;

const navbar = createSlice({
    name: 'navbar',
    initialState,
    reducers: {}
});

export default navbar.reducer;