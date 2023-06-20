import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './state'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

//if only in a situation..the gloabal state need to be stored locallay in each client browsers............................
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PersistGate} from 'redux-persist/es/integration/react';

const persistConfig = { key : 'root', storage, version : 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer : persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:{ignoreActions : [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]},}),
})
// .......................................................................................................................

//this store holds the global state using redux and store should be passed to provider
// const store = configureStore({
//   reducer : {
//     myReducer : authReducer
//   },
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
//   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
