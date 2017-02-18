import {
    Map,
    List
} from 'immutable';
import {
    createSelector
} from 'reselect';
import {login, hide} from './actions';
import {
    NAME
} from './constants';
import {
    push
} from 'react-router-redux';


const _getUserInfo = state => state[NAME].get('userInfo');
const _getAuthorization = state => state[NAME].get('authorization');
const _getShow = state => state[NAME].get('show');
const _getError = state => state[NAME].get('error');

export const getSelector = createSelector(
    [
        _getUserInfo,
        _getAuthorization,
        _getShow,
        _getError
    ],
    (
        userInfo,
        authorization,
        show,
        error
    ) => {
        return {
            userInfo: error ? Map() : userInfo,
            authorization: error ? '' : authorization,
            show,
            error
        };
    }
);

export function mapStateToProps(state) {
    return {
        userInfo: getSelector(state).userInfo,
        authorization: getSelector(state).authorization,
        show: getSelector(state).show,
        error: getSelector(state).error
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        login(username, password) {
            dispatch(login(username, password));
        },
        hide() {
            dispatch(hide());
        }
    };
}