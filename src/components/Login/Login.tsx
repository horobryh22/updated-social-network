import React from 'react';
import {LoginForm} from './LoginForm/LoginForm';
import classes from './Login.module.css'


export const Login = React.memo(() => {
    return (
        <div>
            <div>
                <h1 className={classes.title}>Login</h1>
                <LoginForm/>
            </div>
        </div>
    )
});



