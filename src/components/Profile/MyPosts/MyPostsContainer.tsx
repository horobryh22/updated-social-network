import React from 'react';
import {
    ProfileActionsType,
    addPostActionCreator,
    changeValuePostActionCreator, ProfilePageType
} from '../../../redux/reducers/profile/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';

export type MapStatePropsType = {
    profilePage: ProfilePageType
}

export type MapDispatchPropsType = {
    addPost: () => void
    changeValuePost: (valuePost: string) => void
}


const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: (action: ProfileActionsType) => void): MapDispatchPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        changeValuePost: (valuePost: string) => {
            dispatch(changeValuePostActionCreator(valuePost));
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
