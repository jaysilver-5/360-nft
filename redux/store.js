import { configureStore } from '@reduxjs/toolkit'
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import userSlice from './reducers/user/user-slice'
import uploadSlice from './reducers/upload/upload-slice'
import playerSlice from './reducers/player/player-slice'
import commonSlice from './common';

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const reducers = combineReducers({
    user: userSlice, 
    upload: uploadSlice,
    player: playerSlice,
    common: commonSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});
