import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import "bootstrap/dist/css/bootstrap.min.css";
import Errorhandler from './Components/Errorhandler';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Errorhandler>
    <App />
    </Errorhandler>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
