// Mock analytics page that shows the current state of the shelter

import React, { useState, useEffect } from 'react';
//redux
import { connect } from 'react-redux';
import actions from '../../state/actions/families';

//components
import SupervisorAnalitcs from './supervisor-pages/SupervisorAnalytics';
import GuestAnalitics from './guest-pages/GuestAnalytics';

import { useSelector } from 'react-redux';

const Analytics = ({ fetchHousehold, fetchFamily }) => {
  const user = useSelector(state => state.CURRENT_USER);

  return (
    <div className="dashboard-container">
      {['supervisor', 'case_manager', 'executive_director'].includes(
        user.role
      ) ? (
        <SupervisorAnalitcs />
      ) : (
        <GuestAnalitics />
      )}
    </div>
  );
};

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};

export default Analytics;
