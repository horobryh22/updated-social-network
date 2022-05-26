// import {addPostActionCreator, changeValuePostActionCreator, ProfilePageType, profileReducer} from './profile-reducer';
//
// let valuePost: string;
// let initialState: ProfilePageType
//
// beforeEach(() => {
//     valuePost = 'Hello world, I\'m glad to see you';
//     initialState = {
//         posts: [
//             {id: 1, post: 'Tell me how are you friends?', likes: 10},
//             {id: 2, post: 'Hello, it is my first posts', likes: 15}
//         ],
//         postText: ''
//     }
// })
//
//
// test('The valueTextarea should be changing and the post should be sending', () => {
//
//     const newState = profileReducer(initialState, changeValuePostActionCreator(valuePost));
//
//     expect(newState.postText).toBe(valuePost);
//
// })
//
// test('The post should be sending', () => {
//
//     initialState.postText = valuePost;
//
//     const newState = profileReducer(initialState, addPostActionCreator());
//
//     expect(newState.postText).toBe('');
//     expect(newState.posts.length).toBe(3);
//     expect(newState.posts[0].id).toBe(3);
//     expect(newState.posts[0].post).toBe(valuePost);
//     expect(newState.posts[0].likes).toBe(0);
// })

export {}