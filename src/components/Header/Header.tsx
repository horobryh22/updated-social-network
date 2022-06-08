import React, {useEffect} from 'react';
import classes from './Header.module.css';
import {useAppDispatch, useTypedSelector} from '../../redux/hooks/hooks';
import {NavLink} from 'react-router-dom';
import avatar from '../../assets/images/default-avatar.jpeg'
import {becomeAuthUser, getUserProfile} from '../../redux/reducers/auth/auth-reducer';

export const Header = React.memo(() => {

    const {currentAuthUser, isAuth} = useTypedSelector(state => state.auth);
    const id = useTypedSelector(state => state.auth.userData.id);
    const dispatch = useAppDispatch();

    console.log('Header');

    useEffect(() => { // как здесь правильно ползоваться useEffect, можно ли делать подряд 2 диспатча?
        dispatch(becomeAuthUser());
        if (id) {
            dispatch(getUserProfile(id));
        }
    }, [dispatch, id])

    return (
        <header className={classes.header}>
            <img
                src="http://demo.foxthemes.net/socialitev2.2/assets/images/logo.png"
                alt="logo"/>
            {isAuth
                ? <div className={classes.userDataBlock}>
                    <div className={classes.userName}>{currentAuthUser.fullName}</div>
                    <img src={currentAuthUser.photos?.small ? currentAuthUser.photos.small : avatar} alt=""/>
                </div>
                : <div className={classes.loginBlock}>
                    <NavLink to={'/login'}>LogIn</NavLink>
                </div>
            }
        </header>
    );
});
