import {PostType} from '../../../components/Profile/MyPosts/Post/Post';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {usersAPI} from '../../../api/api';
import {isError} from '../users/users-reducer';

export type PhotosUserType = {
    small: null | string
    large: null | string
}
export type ContactsUserType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type UserProfileType = {
    aboutMe: string | null
    contacts: ContactsUserType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number,
    photos: PhotosUserType
}
export type ProfilePageType = typeof initialState;

const initialState = {
    posts: [
        {id: 1, post: 'Tell me how are you friends?', likes: 10},
        {id: 2, post: 'Hello, it is my first posts', likes: 15}
    ] as Array<PostType>,
    postText: '',
    userProfile: {} as UserProfileType,
    isFetching: false
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost: (state: ProfilePageType) => {
            state.posts.unshift({id: 3, post: state.postText, likes: 0})
            state.postText = '';
        },
        changeValueTextareaPost: (state: ProfilePageType, action: PayloadAction<string>) => {
            state.postText = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
                state.isFetching = false;
            })
            .addCase(setUserProfile.pending, (state) => {
                state.isFetching = true;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                console.log(action.payload);
            })
    }
});


export const setUserProfile = createAsyncThunk<UserProfileType, string, { rejectValue: string }>(
    'profile/setUserProfile',
    async (id, {rejectWithValue}) => {
        try {
            return usersAPI.getUserProfile(Number(id));
        } catch (e) {
            const err = e as Error;
            return rejectWithValue('setUserProfile: ' + err.message);
        }
    }
);

export default profileSlice.reducer;
export const {addPost, changeValueTextareaPost} = profileSlice.actions;