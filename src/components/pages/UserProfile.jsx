import { Divider, Progress } from 'antd';
import React from 'react';
import { allValues } from '../../utils/percentComplete';

const UserProfile = () => {
  const incompleteItems = allValues.map(item => {
    return <li> {item} </li>;
  });
  return (
    <div className="user-container">
      <div className="profile-header-container">
        <header className="profile-header"></header>
        <img
          className="profile-image"
          src="https://source.unsplash.com/random"
          alt=""
          srcset=""
        />
      </div>
      <div className="progress-section">
        <h1> User Profile Information</h1>
        <Progress type="circle" percent={70} />
        <div>
          {' '}
          <h4>Missing Information</h4>
          <ul>{incompleteItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
