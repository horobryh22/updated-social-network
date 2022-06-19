import React, {ChangeEvent, useEffect, useState} from 'react';
import classes from './ProfileStatus.module.css';
import {useAppDispatch, useTypedSelector} from '../../../../redux/hooks/hooks';
import {updateUserStatus} from '../../../../redux/reducers/profile/profile-reducer';


export const ProfileStatus = React.memo(() => {

    const dispatch = useAppDispatch();
    const status = useTypedSelector(state => state.profile.status);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [statusValue, setStatusValue] = useState<string>("");

    useEffect(() => {
        setStatusValue(status);
    },[status])


    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            dispatch(updateUserStatus(statusValue));
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusValue(e.currentTarget.value);
    }

    return (
        <div className={classes.statusWrapper}>
            {(!editMode)
                ? <div onDoubleClick={toggleEditMode}>{status}</div>
                : <input autoFocus onBlur={toggleEditMode} value={statusValue} onChange={onChangeHandler}/>
            }
        </div>
    );
})