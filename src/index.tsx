import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './redux/redux-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>,
            </Provider>
        </BrowserRouter>
        ,
        document.getElementById('root')
    );
}

store.subscribe(rerenderEntireTree)
rerenderEntireTree();

