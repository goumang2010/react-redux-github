import { createStore, applyMiddleware } from 'redux';
// import Thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from 'root';
import promiseMiddleware from 'middleware/promiseMiddleware';

const routeMiddleware = routerMiddleware(hashHistory);

const middleware = [
    // Thunk,
    routeMiddleware
];

const enhancer = applyMiddleware(...middleware);

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
};