import React, {useEffect} from 'react';
import classes from './Users.module.css';
import avatar from '../../assets/images/default-avatar.jpeg'
import {changeCurrentPage, changeFollowed, getUsers,} from '../../redux/reducers/users/users-reducer';
import {useAppDispatch, useTypedSelector} from '../../redux/hooks/hooks';
import {Preloader} from '../common/Preloader/Preloader';
import {NavLink} from 'react-router-dom';


export const Users: React.FC = React.memo(() => {

    const dispatch = useAppDispatch();
    const {users, usersCount, pageSize, currentPage, isFetching} = useTypedSelector(state => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const onClickHandler = (p: number) => {
        dispatch(changeCurrentPage(p));
        dispatch(getUsers());
    }

    const pagesCount = Math.ceil(usersCount / pageSize);
    const pages = [];

    for (let i = 0; i < pagesCount; i++) {
        pages[i] = i + 1
    }

    const mappedPages = pages.map((p, i)=> {
        return (
            <div
                key={i}
                className={currentPage === p ? classes.activeNumberPage : classes.numberPage}
                onClick={() => onClickHandler(p)}
            >{p}</div>
        )
    });

    const mappedUsers = users.map(u => {
        return (
            <div key={u.id} className={classes.userBox}>
                <div className={classes.leftBox}>
                    <NavLink to={`/profile/${u.id}`}>
                        <img src={u.photos.small ? u.photos.small : avatar} alt="avatar"/>
                    </NavLink>
                    <button
                        onClick={() => dispatch(changeFollowed(u.id))}
                    >{u.followed ? 'Unfollowed' : 'Followed'}</button>
                </div>
                <div className={classes.rightBox}>
                    <div className={classes.topRightBox}>
                        <div>{u.name}</div>
                        <div>
                            {/*{`${u.location.country}, ${u.location.city}`}*/}
                        </div>
                    </div>
                    <div className={classes.bottomRightBox}>
                        {u.status}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={classes.userPage}>
            <div className={classes.pagesBox}>
                {mappedPages}
            </div>
            {isFetching ? <Preloader/> : mappedUsers}
        </div>
    )
});

