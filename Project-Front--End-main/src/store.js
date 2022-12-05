import { createStore , applyMiddleware , compose } from "redux";
import thunk from "redux-thunk"; 
import rootReducer from './app/components/kanban/reducers';

// inital varibales 
const initalState = {};
const middleware = [thunk];

let store ; 

store = createStore(
    rootReducer , 
    initalState,
    compose(applyMiddleware(...middleware) )
);


export default store;
/*
import { createStore } from "redux";
import rootReducer from "./app/components/kanban/reducers";

export default createStore(rootReducer);*/
