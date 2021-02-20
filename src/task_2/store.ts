import reducer from "./reducer";
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({reducer: reducer})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

type RootReducerType = typeof rootReducer;
export type GlobalStateType = ReturnType<RootReducerType>;

// @ts-ignore === for debugging into browser devtool
window.store = store;