// import {changeFollowedAC, setUsersAC, UsersPageType, usersReducer} from './users-reducer';
//
//
// let initialState: UsersPageType
//
// beforeEach(() => {
//     initialState = {
//         users: [
//             {
//                 id: 1,
//                 fullName: 'Ilya Khorobrykh',
//                 avatar: 'https://sun1-29.userapi.com/s/v1/if1/_dOpUfCXVAKZDFyeIDyBwa_6fWk8MFZhlRsPMr7afbh3cRjAblOOQwhGau9HF1i7wc7Z65zY.jpg?size=200x200&quality=96&crop=57,0,309,309&ava=1',
//                 location: {
//                     city: 'Omsk',
//                     country: 'Russia'
//                 },
//                 status: 'I enjoy programming',
//                 followed: true,
//             },
//             {
//                 id: 2,
//                 fullName: 'Ilya Khorobrykh',
//                 avatar: 'https://sun1-29.userapi.com/s/v1/if1/_dOpUfCXVAKZDFyeIDyBwa_6fWk8MFZhlRsPMr7afbh3cRjAblOOQwhGau9HF1i7wc7Z65zY.jpg?size=200x200&quality=96&crop=57,0,309,309&ava=1',
//                 location: {
//                     city: 'Omsk',
//                     country: 'Russia'
//                 },
//                 status: 'I enjoy reading',
//                 followed: false,
//             },
//             {
//                 id: 3,
//                 fullName: 'Ilya Khorobrykh',
//                 avatar: 'https://sun1-29.userapi.com/s/v1/if1/_dOpUfCXVAKZDFyeIDyBwa_6fWk8MFZhlRsPMr7afbh3cRjAblOOQwhGau9HF1i7wc7Z65zY.jpg?size=200x200&quality=96&crop=57,0,309,309&ava=1',
//                 location: {
//                     city: 'Omsk',
//                     country: 'Russia'
//                 },
//                 status: 'I enjoy sport',
//                 followed: true,
//             },
//
//         ]
//     }
// })
//
//
// test('The property followed from users should be changed', () => {
//
//     const newState = usersReducer(initialState, changeFollowedAC(1));
//
//     expect(newState.users[0].followed).toBe(false);
//     expect(newState.users[1].followed).toBe(false);
//     expect(newState.users[2].followed).toBe(true);
//
// })
//
// test('New users should be added inside initialState.users', () => {
//
//     const newUsers = [
//         {
//             id: 4,
//             fullName: 'Roman Belykh',
//             avatar: 'https://sun1-29.userapi.com/s/v1/if1/_dOpUfCXVAKZDFyeIDyBwa_6fWk8MFZhlRsPMr7afbh3cRjAblOOQwhGau9HF1i7wc7Z65zY.jpg?size=200x200&quality=96&crop=57,0,309,309&ava=1',
//             location: {
//                 city: 'Omsk',
//                 country: 'Russia'
//             },
//             status: 'I enjoy drink',
//             followed: false,
//         },
//     ]
//
//     const newState = usersReducer(initialState, setUsersAC(newUsers));
//
//     expect(newState.users.length).toBe(4);
//     expect(newState.users[3]).toBe(newUsers[0])
// })
//
// test('If users from Initial State are empty, new Users also should be added', () => {
//
//     initialState.users = [];
//
//     const newUsers = [
//         {
//             id: 4,
//             fullName: 'Roman Belykh',
//             avatar: 'https://sun1-29.userapi.com/s/v1/if1/_dOpUfCXVAKZDFyeIDyBwa_6fWk8MFZhlRsPMr7afbh3cRjAblOOQwhGau9HF1i7wc7Z65zY.jpg?size=200x200&quality=96&crop=57,0,309,309&ava=1',
//             location: {
//                 city: 'Omsk',
//                 country: 'Russia'
//             },
//             status: 'I enjoy drink',
//             followed: false,
//         },
//         {
//             id: 5,
//             fullName: 'Roman Belykh',
//             avatar: 'https://sun1-29.userapi.com/s/v1/if1/_dOpUfCXVAKZDFyeIDyBwa_6fWk8MFZhlRsPMr7afbh3cRjAblOOQwhGau9HF1i7wc7Z65zY.jpg?size=200x200&quality=96&crop=57,0,309,309&ava=1',
//             location: {
//                 city: 'Omsk',
//                 country: 'Russia'
//             },
//             status: 'I enjoy drink',
//             followed: false,
//         },
//     ]
//
//     const newState = usersReducer(initialState, setUsersAC(newUsers));
//
//     expect(newState.users.length).toBe(2);
//     expect(newState.users[1]).toBe(newUsers[1])
// })

export {}
