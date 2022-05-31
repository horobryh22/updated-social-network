import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../Header/Header';
import {Navbar} from '../Navbar/Navbar';
import '../../App.css';

export const Layout = () => {
    return (
        <>
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Outlet/>
            </div>
        </>
    );
};
