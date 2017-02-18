import * as actionTypes from './actionTypes';

const {
    SEARCH_ACTIVENAME,
    SEARCH_REQUEST
} = actionTypes;

export function changeActiveName(activeName) {
    return {
        type: SEARCH_ACTIVENAME,
        activeName: activeName,
    };
}

export const getItems = (query, type, page = 1) => ({ type: SEARCH_REQUEST, payload: {query, type, page}, isFetching: true });
