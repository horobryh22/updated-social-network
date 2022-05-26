import {combineReducers, createStore} from 'redux';
import {profileReducer} from './reducers/profile/profile-reducer';
import {dialogsReducer} from './reducers/dialogs/dialogs-reducer';
import {navbarReducer} from './reducers/navbar/navbar-reducer';
import {usersReducer} from './reducers/users/users-reducer';

export type StateType = ReturnType<typeof rootReducer>;
type StoreType = typeof store;

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
})

export const store = createStore(rootReducer, {});



