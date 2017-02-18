import fetch from 'isomorphic-fetch';
import * as actionTypes from './actionTypes';

const {
    USER_ACTIVENAME,
    USER_REQUEST,
    USER_FAILURE,
    USER_INFO_SUCCESS,
    USER_REP_SUCCESS,
    USER_STARS_SUCCESS,
    USER_FOLLOWERS_SUCCESS,
    USER_FOLLOWINGS_SUCCESS,
} = actionTypes;

export function changeActiveName(activeName) {
    return {
        type: USER_ACTIVENAME,
        activeName,
    };
}

const builldUserAction =  (pattern, success, fail) => name => ({ type: USER_REQUEST, name, url: `https://api.github.com/users/${name}${pattern}`,success, fail, isFetching:true  });


export const getUser = builldUserAction('', USER_INFO_SUCCESS, USER_FAILURE);

export const getUserRep = builldUserAction('/repos', USER_REP_SUCCESS, USER_FAILURE);

export const getUserStars = builldUserAction('/starred', USER_STARS_SUCCESS, USER_FAILURE);

export const getUserFollowers = builldUserAction('/followers', USER_FOLLOWERS_SUCCESS, USER_FAILURE);

export const getUserFollowings = builldUserAction('/following', USER_FOLLOWINGS_SUCCESS, USER_FAILURE);
