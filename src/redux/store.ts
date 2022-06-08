import {configureStore} from '@reduxjs/toolkit';
import profileSlice from './reducers/profile/profile-reducer';
import dialogsSlice from './reducers/dialogs/dialogs-reducer';
import navbarSlice from './reducers/navbar/navbar-reducer';
import usersSlice from './reducers/users/users-reducer';
import authSlice from './reducers/auth/auth-reducer'

export const store = configureStore({
    reducer: {
        profile: profileSlice,
        dialogs: dialogsSlice,
        navbar: navbarSlice,
        users: usersSlice,
        auth: authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
