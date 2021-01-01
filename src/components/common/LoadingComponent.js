import PropTypes from 'prop-types';
import React from 'react';
import { Space, Spin } from 'antd';

function LoadingComponent(props) {
  const { message } = props;

  return (
    <Space size="middle" data-testid="loading">
      <Spin size="large" />
    </Space>
  );
}

export default LoadingComponent;
