import { createStore, applyMiddleware } from 'redux';
// import Thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer, rootEpic } from 'root';
import { createEpicMiddleware } from 'redux-observable';

const routeMiddleware = routerMiddleware(hashHistory);
const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = [
    // Thunk,
    routeMiddleware,
    epicMiddleware
];

const enhancer = applyMiddleware(...middleware);

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
};