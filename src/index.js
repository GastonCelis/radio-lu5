import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID_GOOGLE } from './constants';
import Routes from './routes/Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={CLIENT_ID_GOOGLE}>
        <Routes />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);