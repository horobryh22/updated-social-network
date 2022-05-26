import React from 'react';
import classes from './Users.module.css';
import axios from 'axios';
import avatar from '../../assets/images/default-avatar.jpeg'
import {useAppDispatch, useTypedSelector} from '../../redux/store';
import {changeCurrentPage, changeFollowed, setUsers} from '../../redux/reducers/users/users-reducer';


export const Users: React.FC = React.memo(() => {

    const dispatch = useAppDispatch();
    const {users, usersCount, pageSize, currentPage} = useTypedSelector(state => state.usersPage);

    const getUsers = () => {
        if (users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users?count=5&page=1')
                .then((response ) => {
                    dispatch(setUsers(response.data.items));
                })
        }
    }

    const onClickHandler = (p: number) => {
        dispatch(changeCurrentPage(p));
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${p}`)
            .then((response) => {
                dispatch(setUsers(response.data.items));
            })
    }

    const pagesCount = Math.ceil(usersCount / pageSize);
    const pages = [];

    for (let i = 0; i < pagesCount; i++) {
        pages[i] = i + 1
    }

    const mappedPages = pages.map(p => {
        return (
            <div
                className={currentPage === p ? classes.activeNumberPage : classes.numberPage}
                onClick={() => onClickHandler(p)}
            >{p}</div>
        )
    });

    return (
        <div className={classes.userPage}>
            <div className={classes.pagesBox}>
                {mappedPages}
            </div>
            {users.map(u => {
                return (
                    <div key={u.id} className={classes.userBox}>
                        <div className={classes.leftBox}>
                            <img src={u.photos.small ? u.photos.small : avatar} alt="avatar"/>
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
            })}
        </div>
    )
});

