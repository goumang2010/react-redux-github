import fetch from 'isomorphic-fetch';
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

export const getItemsEpic = action$ =>
    action$.ofType(SEARCH_REQUEST)
    .mergeMap(action => {
        console.log(action.payload);
        let {
            query,
            type,
            page
        } = action.payload;
        let req = new Request(`https://api.github.com/search/${type}?q=${query}&page=${page}`, {
            method: 'GET'
        });
        let fetchreq = fetch(req).then(res => res.json());
        console.log(fromPromise)
        return fromPromise(fetchreq)
            .catch(error => Observable.of({
                type: SEARCH_FAILURE,
                error
            }))
    }).map(res => {
        return getItemsFulfilled(res)
    });
