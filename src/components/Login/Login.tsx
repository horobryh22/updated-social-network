import React from 'react';
import {LoginForm} from './LoginForm/LoginForm';
import classes from './Login.module.css'
import {Navigate} from 'react-router-dom';
import {useTypedSelector} from '../../redux/hooks/hooks';


export const Login = React.memo(() => {

    const isAuth = useTypedSelector(state => state.auth.isAuth);

    if (isAuth) return <Navigate to={'/profile'}/>;

    return (
        <div>
            <div>
                <h1 className={classes.title}>Login</h1>
                <LoginForm/>
            </div>
        </div>
    )
});



