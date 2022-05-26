import React from 'react';
import {connect} from 'react-redux';
import {Navbar} from './Navbar';
import {StateType} from '../../redux/redux-store';
import {NavbarType} from '../../redux/reducers/navbar/navbar-reducer';


export type MapStatePropsType = {
    navbar: NavbarType
}

export type MapDispatchPropsType = {

}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        navbar: state.navbar
    }
}
//
const mapDispatchToProps = (dispatch: (action: any) => void): MapDispatchPropsType => {
    return {

    }
}

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)

