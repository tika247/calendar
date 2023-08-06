import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './App';
import reportWebVitals from './settings/reportWebVitals';
import { Provider } from 'react-redux'
import store from 'src/store/store';

// Notice how you need to tell typescript that you are sure your root won't be null with the exclamation mark ('!')
const root = ReactDOM.createRoot(
  document.getElementById('root')! as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
