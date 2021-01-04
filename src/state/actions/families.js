// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Import action TYPES at the top of the file for family related actions
import ActionButton from 'antd/lib/modal/ActionButton';
import { axiosWithAuth } from '../../api/axiosWithAuth';

import {
  GET_FAMILY_FETCHING,
  GET_FAMILY_SUCCESS,
  GET_FAMILY_FAILURE,
  GET_HOUSEHOLD_FETCHING,
  GET_MEMBERS_FAILURE,
  GET_HOUSEHOLD_SUCCESS,
  GET_HOUSEHOLD_FAILURE,
} from '../types';

const fetchFamily = () => (dispatch, getState) => {
  dispatch({ type: GET_FAMILY_FETCHING, payload: true });
  const state = getState();
  const user_id = state.CURRENT_USER.id;
  console.log('userID*********', user_id);
  // get family id from family state
  // and then fetch household
  try {
    axiosWithAuth()
      .get(`/families/user/${user_id}`)
      .then(res => {
        dispatch({ type: GET_FAMILY_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ GET_FAMILY_FAILURE, payload: error });
      });
  } catch (error) {
    console.log(error);
  }
};

const fetchHousehold = () => async (dispatch, getState) => {
  const state = getState();
  console.log('state*****', state);
  // get family id from family state
  // and then fetch household
  dispatch({ type: GET_HOUSEHOLD_FETCHING, payload: true });
  try {
    let household = await axiosWithAuth()
      .get(`/families/1/household`)
      .then(household => {
        dispatch({ type: GET_HOUSEHOLD_SUCCESS, payload: household });
      });
  } catch (error) {
    console.log(error);
    // dispatch({ GET_HOUSEHOLD_FAILURE, payload: error });
  }
};

export default {
  fetchHousehold,
  fetchFamily,
};
