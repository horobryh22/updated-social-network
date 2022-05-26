import {PostType} from '../../../components/Profile/MyPosts/Post/Post';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ProfilePageType = typeof initialState;
const initialState = {
    posts: [
        {id: 1, post: 'Tell me how are you friends?', likes: 10},
        {id: 2, post: 'Hello, it is my first posts', likes: 15}
    ] as Array<PostType>,
    postText: ''
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost: (state: ProfilePageType) => {
            state.posts = [{id: 3, post: state.postText, likes: 0}, ...state.posts];
            state.postText = '';
        },
        changeValueTextareaPost: (state:ProfilePageType, action:PayloadAction<string>) => {
            state.postText = action.payload;
        }
    }
})

export default profileSlice.reducer;
export const {addPost, changeValueTextareaPost} = profileSlice.actions;