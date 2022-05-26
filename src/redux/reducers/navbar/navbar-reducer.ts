export type NavbarType = Array<NavElementType>

export type NavElementType = {
    id: number
    navElement: string
    to: string
}

const initialState: NavbarType = [
    {navElement: 'Profile', to: '/profile', id: 1},
    {navElement: 'Messages', to: '/dialogs', id: 2},
    {navElement: 'News', to: '/news', id: 3},
    {navElement: 'Music', to: '/music', id: 4},
    {navElement: 'Friends', to: '/friends', id: 5},
    {navElement: 'Settings', to: '/settings', id: 6},
    {navElement: 'Users', to: '/users', id: 7},
]

export const navbarReducer = (state: NavbarType = initialState, action: any): NavbarType => {
    return state;
}