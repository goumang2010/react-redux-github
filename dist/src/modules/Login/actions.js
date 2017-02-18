import { LOGIN_REQUEST, LOGIN_HIDE } from './actionTypes';

export const login = (username, password) => ({type: LOGIN_REQUEST, payload: {username, password}});

export const hide = () => ({type: LOGIN_HIDE});
