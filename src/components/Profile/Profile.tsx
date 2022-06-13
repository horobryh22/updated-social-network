import React, {ComponentType} from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPosts} from './MyPosts/MyPosts';
import {compose} from '@reduxjs/toolkit';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

const Profile = React.memo(() => {

    return (
            <div>
                <ProfileInfo/>
                <MyPosts/>
            </div>
        );
});

export default React.memo(compose<ComponentType>(withAuthRedirect)(Profile));
