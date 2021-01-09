// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Import action TYPES at the top of the file for family related actions
import _ from 'underscore';

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

const fetchFamily = familyId => (dispatch, getState) => {
  dispatch({ type: GET_FAMILY_FETCHING, payload: true });

  return axiosWithAuth()
    .get(`/families/${familyId}`)
    .then(res => {
      dispatch({ type: GET_FAMILY_SUCCESS, payload: res.data });
    })
    .then(res => {})
    .catch(error => {
      dispatch({ type: GET_FAMILY_FAILURE, payload: error });
    });
};

const fetchHousehold = family_id => dispatch => {
  dispatch({ type: GET_HOUSEHOLD_FETCHING, payload: true });

  axiosWithAuth()
    .get(`/families/${family_id}/household`)
    .then(res => {
      let household = {};
      if (res && res.data) {
        let household_obj = res.data;
        // picks out family specific values
        household = _.pick(
          household_obj[1],
          'case_number',
          'phone_one',
          'phone_two',
          'safe_alternate',
          'emergency_contact',
          'vehicle',
          'last_permanent_address',
          'homeless_info',
          'gov_benefits',
          'domestic_violence_info',
          'pets',
          'avatar_url',
          'househould_type',
          'length_of_stay',
          'case_members'
        );
        let members = [];
        // loops through members and pics member specifics for members array
        for (let i = 0; i < household_obj.length; i++) {
          let member = _.pick(
            household_obj[i],
            'date_of_enrollment',
            'household_type',
            'demographics',
            'barriers',
            'schools',
            'case_members'
          );
          members.push(member);
        }
        household['members'] = members;
        // adds members as an array to household object
        dispatch({ type: GET_HOUSEHOLD_SUCCESS, payload: household });
      }
    })
    .catch(error => {
      dispatch({ type: GET_HOUSEHOLD_FAILURE, payload: error.message });
    });
};

export default {
  fetchHousehold,
  fetchFamily,
};
