import React from 'react';
import classes from './Users.module.css';
import {MapDispatchPropsType, MapStatePropsType} from './UsersContainer';
import axios, {AxiosResponse} from 'axios';
import {UsersTestType} from '../../redux/reducers/users/users-reducer';
import avatar from '../../assets/images/default-avatar.jpeg'

export type UsersPropsType = MapDispatchPropsType & MapStatePropsType;

type DataType = {
    error: null | string
    items: Array<UsersTestType>
    totalCount: number
}

export const Users: React.FC<UsersPropsType> = ({usersPage, changeFollowed, setUsers}) => {

    const getUsers = () => {
        if (usersPage.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users?count=5&page=1')
                .then((response: AxiosResponse<DataType>) => {
                    setUsers(response.data.items);
                })
        }
    }

    return (
        <div className={classes.userPage}>
            <button onClick={getUsers}>Get Users</button>
            {usersPage.users.map(u => {
                return (
                    <div key={u.id} className={classes.userBox}>
                        <div className={classes.leftBox}>
                            <img src={u.photos.small ? u.photos.small : avatar} alt='avatar'/>
                            <button onClick={() => changeFollowed(u.id)}>{u.followed ? 'Unfollowed' : 'Followed'}</button>
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
    );
};

