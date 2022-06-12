import React, {useCallback} from 'react';
import {useAppDispatch, useTypedSelector} from '../../redux/hooks/hooks';
import classes from './Users.module.css';
import {NavLink} from 'react-router-dom';
import avatar from '../../assets/images/default-avatar.jpeg';
import {changeUserFollowStatus} from '../../redux/reducers/users/users-reducer';

type UserPropsType = {
    userId: number
    photo: string | null
    followed: boolean
    name: string
    status: string | null
}
export const User: React.FC<UserPropsType> = React.memo(({userId, photo, followed, name, status}) => {

    const dispatch = useAppDispatch();
    const isChangingFollowStatus = useTypedSelector(state => state.users.isChangingFollowStatus);

    const onClickHandler = useCallback(() => {
        dispatch(changeUserFollowStatus({id: userId, followed}))
    }, [followed, userId])

    return (
        <div key={userId} className={classes.userBox}>
            <div className={classes.leftBox}>
                <NavLink to={`/profile/${userId}`}>
                    <img src={photo ? photo : avatar} alt="avatar"/>
                </NavLink>
                <button
                    disabled={isChangingFollowStatus.some(id => userId === id)}
                    onClick={onClickHandler}
                >{followed ? 'Unfollowed' : 'Followed'}</button>
            </div>
            <div className={classes.rightBox}>
                <div className={classes.topRightBox}>
                    <div>{name}</div>
                    <div>
                        {/*{`${u.location.country}, ${u.location.city}`}*/}
                    </div>
                </div>
                <div className={classes.bottomRightBox}>
                    {status}
                </div>
            </div>
        </div>
    )
})