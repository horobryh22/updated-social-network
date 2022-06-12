import React, {useCallback, useEffect, useMemo} from 'react';
import classes from './Users.module.css';
import {getUsers,} from '../../redux/reducers/users/users-reducer';
import {useAppDispatch, useTypedSelector} from '../../redux/hooks/hooks';
import {Preloader} from '../common/Preloader/Preloader';
import {User} from './User';


export const Users: React.FC = React.memo(() => {

    const dispatch = useAppDispatch();
    const {users, usersCount, pageSize, currentPage, isFetching,} = useTypedSelector(state => state.users);

    useEffect(() => {
        dispatch(getUsers(1));
    }, [dispatch]);

    const onClickHandler = useCallback((p: number) => {
        dispatch(getUsers(p));
    }, [dispatch])

    const mappedPages = useMemo(() => {
        const pagesCount = Math.ceil(usersCount / pageSize);
        const pages = [];

        for (let i = 0; i < pagesCount; i++) {
            pages[i] = i + 1
        }

        return pages.map((p, i) => {
            return (
                <div
                    key={i}
                    className={currentPage === p ? classes.activeNumberPage : classes.numberPage}
                    onClick={() => onClickHandler(p)}
                >{p}</div>
            )
        });
    }, [currentPage, pageSize, usersCount])

    const mappedUsers = users.map(u => {
        return (
            <User key={u.id} userId={u.id} photo={u.photos.small} followed={u.followed} name={u.name}
                  status={u.status}/>
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



