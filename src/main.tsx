import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';

import './theme.less';
import './index.less';

const rootComponent = (
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ruRU}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(rootComponent, document.getElementById('root'));

reportWebVitals();
