import fetch from 'isomorphic-fetch';
const LoginSelector = require('modules/Login').selectors.getSelector;
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


const fulfilled = ({
    result,
    action
}) => ({
    type: action.success,
    result
});

// epic
export const getUserEpic = (action$, store) =>
    action$.ofType(USER_REQUEST)
    .mergeMap(action => {
            let Authorization = LoginSelector(store.getState()).authorization;
            let reqOption = {
                method: 'GET'
            }
            Authorization && (reqOption.headers = {
                Authorization
            })
            return fromPromise(fetch(action.url, reqOption).then(res => {
                    if (res.status !== 200) {
                        return Promise.reject(`${res.status}:${res.statusText}`);
                    } else {
                        return res.json();
                    }
                }).then(result => ({
                    result,
                    action
                })))
                .map(obj => fulfilled(obj))
                .catch(error => Observable.of({
                    type: USER_FAILURE,
                    error
                }))
        });