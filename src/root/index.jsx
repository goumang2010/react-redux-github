
import 'rxjs/add/operator/mergeMap.js';
import 'rxjs/add/operator/map.js';
import 'rxjs/add/operator/catch.js';

import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as Search from 'modules/Search';
import * as User from 'modules/User';
import * as Login from 'modules/Login';

export const rootReducer = combineReducers({
    [Search.constants.NAME]: Search.reducer,
    [User.constants.NAME]: User.reducer,
    [Login.constants.NAME]: Login.reducer,
    routing: routerReducer
});

export const rootEpic = combineEpics(...Object.values({
    ...Search.epics,
    ...User.epics,
    ...Login.epics
}));
