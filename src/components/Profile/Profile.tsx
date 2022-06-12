import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPosts} from './MyPosts/MyPosts';
import {useTypedSelector} from '../../redux/hooks/hooks';
import {Navigate} from 'react-router-dom';


export const Profile = React.memo(() => {

    const {isAuth} = useTypedSelector(state => state.auth);

    return (!isAuth)
        ? <Navigate to={'/login'}/>
        : (
            <div>
                <ProfileInfo/>
                <MyPosts/>
            </div>
        );
})
