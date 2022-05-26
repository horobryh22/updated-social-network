import {PostType} from '../../../components/Profile/MyPosts/Post/Post';

export type ProfilePageType = typeof initialState;

export type ProfileActionsType = ReturnType<typeof addPostActionCreator> | ReturnType<typeof changeValuePostActionCreator>;

const ADD_POST = 'ADD-POST';
const CHANGE_VALUE_TEXTAREA_POST = 'CHANGE-VALUE-TEXTAREA-POST';

const initialState = {
    posts: [
        {id: 1, post: 'Tell me how are you friends?', likes: 10},
        {id: 2, post: 'Hello, it is my first posts', likes: 15}
    ] as Array<PostType>,
    postText: ''
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 3,
                post: state.postText,
                likes: 0
            }
            return {...state, posts: [newPost, ...state.posts], postText: ''}

        case CHANGE_VALUE_TEXTAREA_POST:
            return {...state, postText: action.valuePost}

        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST} as const);

export const changeValuePostActionCreator = (valuePost: string) =>
    ({type: CHANGE_VALUE_TEXTAREA_POST, valuePost} as const);
