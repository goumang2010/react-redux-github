import fetch from 'isomorphic-fetch';
import {
    fromPromise
} from 'rxjs/observable/fromPromise.js';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './actionTypes';

const loginFulfilled = result => ({
    type: LOGIN_SUCCESS,
    result
});

export const loginEpic = action$ =>
    action$.ofType(LOGIN_REQUEST)
    .mergeMap(action => {
        let {
            username,
            password
        } = action.payload;
        // console.log(action.payload);
        let Authorization = `Basic ${btoa(`${username}:${password}`)}`;
        let req = new Request(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization
            }
        });
        let fetchreq = fetch(req).then((res) => {
            if (res.status !== 200) {
                return Promise.reject(`${res.status}:${res.statusText}`);
            } else {
                return res.json();
            }
        });
        return fromPromise(fetchreq)
            .map(res => loginFulfilled({
                authorization: Authorization,
                userInfo: res
            }))
            .catch(error => Observable.of({
                type: LOGIN_FAILURE,
                error
            }))
    });