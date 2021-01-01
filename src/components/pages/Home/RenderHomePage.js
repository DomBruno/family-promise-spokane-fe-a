import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
function RenderHomePage(props) {
  const user = useSelector(state => state.CURRENT_USER);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user.role) {
    return <div data-testid="waiting">Waiting..</div>;
  }

  switch (user.role) {
    case 'guest':
      return <Redirect to="guest-dashboard" />;
    case 'supervisor':
      return <Redirect to="/guests" />;
    case 'case_manager':
      return <Redirect to="/guests" />;
    case 'executive_director':
      return <Redirect to="/analytics" />;
    default:
      return <Redirect to="/login" />;
  }
}
export default RenderHomePage;
