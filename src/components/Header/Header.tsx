import React from 'react';
import classes from './Header.module.css';

export const Header = React.memo(() => {
    return (
        <header className={classes.header}>
            <img
                src="http://demo.foxthemes.net/socialitev2.2/assets/images/logo.png"
                alt=""/>
        </header>
    );
});
