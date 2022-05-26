import React from 'react';
import classes from './Navbar.module.css';
import {MapDispatchPropsType, MapStatePropsType} from './NavbarContainer';
import {NavLink} from 'react-router-dom';

export type NavbarPropsType = MapStatePropsType & MapDispatchPropsType;

export const Navbar: React.FC<NavbarPropsType> = ({navbar}) => {

    return (
        <nav className={classes.nav}>
            {navbar.map((navElement, i) => (
                <div key={navElement.id} className={classes.item}>
                    <NavLink
                        to={`${navElement.to}`}
                        className={({isActive}) => isActive ? classes.active : ''}
                    >{navElement.navElement}</NavLink>
                </div>
            ))}
        </nav>
    );
}


