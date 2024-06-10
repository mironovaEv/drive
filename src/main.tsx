import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { ProvideLayoutConfig } from './shared/hooks/useLayoutConfig/useLayoutConfig';

import './theme.less';
import './index.less';

const rootComponent = (
  <React.StrictMode>
    <BrowserRouter>
      <ProvideLayoutConfig>
        <ConfigProvider locale={ruRU}>
          <App />
        </ConfigProvider>
      </ProvideLayoutConfig>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(rootComponent, document.getElementById('root'));

reportWebVitals();
