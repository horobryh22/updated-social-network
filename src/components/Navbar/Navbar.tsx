import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {useTypedSelector} from '../../redux/store';


export const Navbar: React.FC = React.memo(() => {

    const {navbar} = useTypedSelector(state => state);

    const mappedNavbar = navbar.map((navElement, i) => (
        <div key={navElement.id} className={classes.item}>
            <NavLink
                to={`${navElement.to}`}
                className={({isActive}) => isActive ? classes.active : ''}
            >{navElement.navElement}</NavLink>
        </div>
    ))

    return (
        <nav className={classes.nav}>
            {mappedNavbar}
        </nav>
    );
});


