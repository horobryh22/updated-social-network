import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPosts} from './MyPosts/MyPosts';


export const Profile = React.memo(() => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    );
})
