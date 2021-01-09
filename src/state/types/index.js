// we started to transition into declaring user types in this file
// although you can probabably tell some of these we didn't get enough time to start using
// you will find in some files throughout the app we did data fetching in the useEffect hook
// something the next team can focus on is centralizing all state and data fetching to come from redux
// declare all types here and import them in the reducer/action files

// user types
export const LOG_IN = 'LOG_IN';
export const SET_LOADING = 'SET_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// family types
export const GET_FAMILY_FETCHING = 'GET_FAMILY_FETCHING';
export const GET_FAMILY_SUCCESS = 'GET_FAMILY_SUCCESS';
export const GET_FAMILY_FAILURE = 'GET_FAMILY_FAILURE';

// members types (not currently being used)
export const GET_MEMBERS_FETCHING = 'GET_MEMBERS_FETCHING';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';

// household types
export const GET_HOUSEHOLD_FETCHING = 'GET_HOUSEHOLD_FETCHING';
export const GET_HOUSEHOLD_SUCCESS = 'GET_HOUSEHOLD_SUCCESS';
export const GET_HOUSEHOLD_FAILURE = 'GET_HOUSEHOLD_FAILURE';
