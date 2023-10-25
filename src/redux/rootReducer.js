import { combineReducers, createStore } from "redux";
import { cartReducer } from "./cartReducer";
import { movieReducer } from "./movieReducer";

const rootReducer = combineReducers(
    {
        cartReducer: cartReducer,
        movieReducer: movieReducer,
        userReducer: movieReducer
    })
export const store = createStore(rootReducer);