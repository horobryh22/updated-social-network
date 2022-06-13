import React, {ComponentType} from 'react';
import {useTypedSelector} from '../redux/hooks/hooks';
import {Navigate} from 'react-router-dom';

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    return (props: T) => {

        const isAuth = useTypedSelector(state => state.auth.isAuth);

        return (!isAuth) ? <Navigate to={'/login'}/> : <Component {...props}/>

    };
}
