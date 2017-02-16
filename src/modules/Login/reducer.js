import {
    Map,
    List
} from 'immutable';
import * as actionTypes from './actionTypes';
import toImmutable from 'common/toImmutable';


const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_HIDE
} = actionTypes;

const initialState = Map({
    userInfo: Map(),
    authorization: '',
    show: true,
    error: ''
});

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state.set('show', true);
        case LOGIN_SUCCESS:
            let result = action.result;
            console.log(result);
            // save authorization
            return state
                .set('userInfo', toImmutable(result.userInfo))
                .set('authorization', result.authorization)
                .set('error', '')
                .set('show', false);
        case LOGIN_FAILURE:
            console.log(action.error);
            return state.set('error', action.error).set('show', true);
        case LOGIN_HIDE:
            return state.set('show', false);
        default:
            return state;
    }
};