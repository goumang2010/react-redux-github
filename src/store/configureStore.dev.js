import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import Thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import { rootReducer, rootEpic } from 'root';
import DevTools from 'src/DevTools';

const routeMiddleware = routerMiddleware(browserHistory);
const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = [
    // Thunk,
    routeMiddleware,
    epicMiddleware
];

const enhancer = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
);


function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
};