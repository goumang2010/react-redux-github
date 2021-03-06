import Immutable from 'immutable';
import * as actionTypes from './actionTypes';
import toImmutable from 'common/toImmutable';

const {
    Map,
    List
} = Immutable;

const {
    SEARCH_ACTIVENAME,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
} = actionTypes;

const initialState = Map({
    items: List(),
    activeName: '',
    totalPages: 0,
    resetPage: false,
    isFetching: false,
    error: ''
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return state.set('isFetching', action.isFetching);
        case SEARCH_SUCCESS:
            let totalPages,
                result = action.result;
            if (result.totalCount === result.items.length) {
                totalPages = 1;
            } else {
                totalPages = Number((result.totalCount / result.items.length).toFixed(0)) + 1;
            }

            return state
                .set('items', toImmutable(result.items))
                .set('totalPages', totalPages)
                .set('resetPage', false)
                .set('isFetching', result.isFetching);
        case SEARCH_ACTIVENAME:
            return state
                .set('activeName', action.activeName)
                .set('totalPages', 0)
                .set('resetPage', true);
        case SEARCH_FAILURE:
            console.log(`search error:`)
            console.log(action.error);
            return state.set('error', action.error);
        default:
            return state;
    }
};