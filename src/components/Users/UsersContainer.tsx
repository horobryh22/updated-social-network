import {connect} from 'react-redux';
import {Users} from './Users';
import {StateType} from '../../redux/redux-store';
import {
    changeCurrentPageAC,
    changeFollowedAC, setTotalCountAC,
    setUsersAC,
    UsersActionsType,
    UsersPageType, UsersTestType,
} from '../../redux/reducers/users/users-reducer';

export type MapStatePropsType = {
    usersPage: UsersPageType
}

export type MapDispatchPropsType = {
    changeFollowed: (userId: number) => void
    setTotalCount: (totalCount: number) => void
    setUsers: (users: Array<UsersTestType>) => void
    changeCurrentPage: (pageNumber: number) => void

}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: (action: UsersActionsType) => void): MapDispatchPropsType => {
    return {
        changeFollowed: (userId: number) => {
            dispatch(changeFollowedAC(userId));
        },
        setUsers: (users: Array<UsersTestType>) => {
            dispatch(setUsersAC(users));
        },
        changeCurrentPage: (pageNumber: number) => {
            dispatch(changeCurrentPageAC(pageNumber))
        },
        setTotalCount: (totalCount: number) => {
            dispatch(setTotalCountAC(totalCount));
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);