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
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

const rootComponent = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProvideLayoutConfig>
          <ConfigProvider locale={ruRU}>
            <App />
          </ConfigProvider>
        </ProvideLayoutConfig>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(rootComponent, document.getElementById('root'));

reportWebVitals();
