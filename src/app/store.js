import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import registroSlice from './silices/registro/registroSlice';
import beneficioSlice from './silices/beneficio/beneficioSlice';
import concursoSlice from './silices/concurso/concursoSlice';
import loginSlice from './silices/login/loginSlice';
import usuarioSlice from './silices/usuarios/usuarioSlice';
import usuarioGoogleSlice from './silices/usuarios/usuarioGoogleSlice';
import claveSlice from './silices/clave/claveSlice';

const reducers = combineReducers({
    registroSlice,
    beneficioSlice,
    concursoSlice,
    loginSlice,
    usuarioSlice,
    usuarioGoogleSlice,
    claveSlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['usuarioGoogleSlice', 'loginSlice', 'usuarioSlice']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});