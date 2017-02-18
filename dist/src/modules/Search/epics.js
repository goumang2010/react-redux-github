import fetch from 'isomorphic-fetch';
const LoginSelector = require('modules/Login').selectors.getSelector;
import {
    fromPromise
} from 'rxjs/observable/fromPromise.js';

import {
    SEARCH_ACTIVENAME,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from './actionTypes';

const getItemsFulfilled = result => ({
    type: SEARCH_SUCCESS,
    result
});

export const getItemsEpic = (action$, store) =>
    action$.ofType(SEARCH_REQUEST)
    .mergeMap(action => {
        let {
            query,
            type,
            page
        } = action.payload;
        let Authorization = LoginSelector(store.getState()).authorization;
        let reqOption = {
            method: 'GET'
        }
        Authorization && (reqOption.headers = {
            Authorization
        })
        let req = new Request(`https://api.github.com/search/${type}?q=${query}&page=${page}`, reqOption);
        let fetchreq = fetch(req).then(res => {
            if (res.status !== 200) {
                return Promise.reject(`${res.status}:${res.statusText}`);
            } else {
                return res.json();
            }
        });
        return fromPromise(fetchreq)
            .map(res => {
                return getItemsFulfilled(res)
            })
            .catch(error => Observable.of({
                type: SEARCH_FAILURE,
                error
            }))
    });