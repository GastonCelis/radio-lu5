import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import registroSlice from './silices/registro/registroSlice';
import beneficioSlice from './silices/beneficio/beneficioSlice';
import concursoSlice from './silices/concurso/concursoSlice';

const reducers = combineReducers({
    registroSlice,
    beneficioSlice,
    concursoSlice
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});