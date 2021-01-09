// since this reducer is still relatively short we kept it in one file
// once it starts to get longer it can be broken down into more files

import {
  LOG_IN,
  SET_LOADING,
  SET_CURRENT_USER,
  GET_FAMILY_FETCHING,
  GET_FAMILY_SUCCESS,
  GET_FAMILY_FAILURE,
  GET_HOUSEHOLD_FETCHING,
  GET_HOUSEHOLD_FAILURE,
  GET_HOUSEHOLD_SUCCESS,
} from '../types';

const INITIAL_STATE = {
  CURRENT_USER: {},
  FAMILY: {},
  HOUSEHOLD: {},
  LOGGED_IN: false,
  LOADING: false,
  ERROR: '',
};

export const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, CURRENT_USER: action.payload };
    case LOG_IN:
      return { ...state, LOGGED_IN: true };
    case 'LOG_OUT':
      return { ...state, LOGGED_IN: false };
    case SET_LOADING:
      return { ...state, LOADING: action.payload };
    case GET_FAMILY_FETCHING:
      return { ...state, LOADING: true };
    case GET_FAMILY_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case GET_FAMILY_SUCCESS:
      return { ...state, LOADING: false, FAMILY: action.payload };
    case GET_HOUSEHOLD_FETCHING:
      return { ...state, LOADING: true };
    case GET_HOUSEHOLD_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case GET_HOUSEHOLD_SUCCESS:
      return { ...state, LOADING: false, HOUSEHOLD: action.payload };
    default:
      return state;
  }
};
