import React from 'react';
import './App.css';
import {Profile} from './components/Profile/Profile';
import {Route, Routes} from 'react-router-dom';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Users} from './components/Users/Users';
import {Layout} from './components/Layout/Layout';
import {Login} from './components/Login/Login';


const App = () => {
    return (
        <div className="app-wrapper">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="profile/:id" element={<Profile/>}/>
                    <Route path="dialogs" element={<Dialogs/>}/>
                    <Route path="users" element={<Users/>}/>
                    <Route path="login" element={<Login/>}/>
                    {/*<Route path='/news' element={News}/>*/}
                    {/*<Route path='/music' element={Music}/>*/}
                    {/*<Route path='/settings' element={Settings}/>*/}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
