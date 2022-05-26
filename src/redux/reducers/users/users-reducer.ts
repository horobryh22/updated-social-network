type UserLocationType = {
    city: string
    country: string
}

export type UsersTestType = {
    name: string
    id: number
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    followed: boolean
}

// export type UserType = {
//     id: number
//     fullName: string
//     avatar: string
//     location: UserLocationType
//     status: string
//     followed: boolean
// }

export type UsersPageType = {
    users: Array<UsersTestType>
    pageSize: number
    usersCount: number
    currentPage: number
}

export type UsersActionsType = ReturnType<typeof changeFollowedAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof changeCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>

const SET_USERS = 'SET-USERS';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const CHANGE_FOLLOWED = 'CHANGE-FOLLOWED';
const CHANGE_CURRENT_PAGE = 'CHANGE-CURRENT-PAGE';

const initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    usersCount: 0,
    currentPage: 1
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersActionsType): UsersPageType => {
    switch (action.type) {
        case CHANGE_FOLLOWED:
            const userId = action.payload.userId;
            return {
                ...state,
                users: state.users
                    .map(u => u.id === userId
                        ? {...u, followed: !(state.users.find(el => el.id === userId)?.followed)}
                        : u)
            }
        case SET_USERS:
            return {...state, users: [...action.payload.users]};
        case CHANGE_CURRENT_PAGE:
            return {...state, currentPage: action.payload.pageNumber}
        case SET_TOTAL_COUNT:
            return {...state, usersCount: action.payload.totalCount}
        default:
            return state;
    }
}

export const changeFollowedAC = (userId: number) => {
    return {
        type: CHANGE_FOLLOWED,
        payload: {
            userId
        }
    } as const
}

export const setUsersAC = (users: Array<UsersTestType>) => {
    return {
        type: SET_USERS,
        payload: {
            users
        }
    } as const
}

export const changeCurrentPageAC = (pageNumber: number) => {
    return {
        type: CHANGE_CURRENT_PAGE,
        payload: {
            pageNumber
        }
    } as const
}

export const setTotalCountAC = (totalCount: number) => {
    return {
        type: SET_TOTAL_COUNT,
        payload: {
            totalCount
        }
    } as const
}
