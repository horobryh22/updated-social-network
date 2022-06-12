import React, {useEffect} from 'react';
import classes from './Header.module.css';
import {useAppDispatch, useTypedSelector} from '../../redux/hooks/hooks';
import {NavLink} from 'react-router-dom';
import avatar from '../../assets/images/default-avatar.jpeg'
import {loginMe} from '../../redux/reducers/auth/auth-reducer';

export const Header = React.memo(() => {

    const {isAuth, currentAuthUserData} = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loginMe());
    }, [dispatch])

    return (
        <header className={classes.header}>
            <img
                src="http://demo.foxthemes.net/socialitev2.2/assets/images/logo.png"
                alt="logo"/>
            {isAuth
                ? <div className={classes.userDataBlock}>
                    <div className={classes.userName}>{currentAuthUserData.fullName}</div>
                    <img src={currentAuthUserData.photos?.small ? currentAuthUserData.photos.small : avatar} alt=""/>
                </div>
                : <div className={classes.loginBlock}>
                    <NavLink to={'/login'}>LogIn</NavLink>
                </div>
            }
        </header>
    );
});
