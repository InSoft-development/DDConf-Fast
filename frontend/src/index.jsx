import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App as AntdApp } from 'antd';

import {store} from './services/store';
import App from './components/app/app';
import './index.scss';


const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AntdApp>
                    <App />
                </AntdApp>
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
);