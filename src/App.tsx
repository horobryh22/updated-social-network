import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Profile} from './components/Profile/Profile';
import {Route, Routes} from 'react-router-dom';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Navbar} from './components/Navbar/Navbar';
import {Users} from './components/Users/Users';


const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/dialogs" element={<Dialogs/>}/>
                    <Route path="/users" element={<Users/>}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}
                </Routes>
            </div>
        </div>
    );
}

export default App;
