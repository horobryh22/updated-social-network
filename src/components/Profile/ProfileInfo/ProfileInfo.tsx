import React, {useEffect} from 'react';
import classes from './ProfileInfo.module.css'
import {useAppDispatch, useTypedSelector} from '../../../redux/hooks/hooks';
import {useParams} from 'react-router-dom';
import {Preloader} from '../../common/Preloader/Preloader';
import avatar from '../../../assets/images/default-avatar.jpeg'
import {setUserProfile} from '../../../redux/reducers/profile/profile-reducer';


export const ProfileInfo = React.memo(() => {

    const dispatch = useAppDispatch();
    const {isFetching, userProfile} = useTypedSelector(state => state.profile);

    const {id: idParam} = useParams();
    const currentAuthUserId = useTypedSelector(state => state.auth.currentAuthUserData.userId);
    const id = (idParam) ? idParam : (currentAuthUserId) ? currentAuthUserId.toString() : '24040';

    useEffect(() => {
        dispatch(setUserProfile(id));
    }, [dispatch, id]);

    return (
        <div>
            <div>
                <img className={classes.profileImg}
                     src="https://media-exp1.licdn.com/dms/image/C4D1BAQGDmALg_8s-Yg/company-background_10000/0/1519799119530?e=2147483647&v=beta&t=MpzHeo7wdMoePy-CjWNPwwMbgDU3ydtdqIXGYFtSisg"
                     alt=""/>
            </div>
            <div className={classes.descriptionBlock}>
                {isFetching
                    ? <Preloader/>
                    : <>
                        <div className={classes.imageContainer}><img
                            src={userProfile.photos?.large ? userProfile.photos.large : avatar} alt=""/></div>
                        <div className={classes.userDataContainer}>
                            <h2>{userProfile.fullName}</h2>
                            <span>{userProfile.aboutMe}</span>
                        </div>
                    </>
                }
            </div>
        </div>
    );
});


