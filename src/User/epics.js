import {
    fromPromise
} from 'rxjs/observable/fromPromise.js';

import {
    USER_ACTIVENAME,
    USER_REQUEST,
    USER_FAILURE,
    USER_INFO_SUCCESS,
    USER_REP_SUCCESS,
    USER_STARS_SUCCESS,
    USER_FOLLOWERS_SUCCESS,
    USER_FOLLOWINGS_SUCCESS,
} from './actionTypes';


const fulfilled = ({result, action}) => ({
    type: action.success,
    result
});

// epic
export const getUserEpic = action$ =>
    action$.ofType(USER_REQUEST)
    .mergeMap(action =>
        fromPromise(fetch(action.url).then(res => res.json()).then(result => ({result, action})))
        .catch(error => Observable.of({
            type: USER_FAILURE,
            error
        }))
    ).map(obj => fulfilled(obj));