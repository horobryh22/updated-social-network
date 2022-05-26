import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import profileReducer from './reducers/profile/profile-reducer';
import dialogsReducer from './reducers/dialogs/dialogs-reducer';
import navbarReducer from './reducers/navbar/navbar-reducer';
import usersReducer from './reducers/users/users-reducer';

export const store = configureStore({
    reducer: {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        navbar: navbarReducer,
        usersPage: usersReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
