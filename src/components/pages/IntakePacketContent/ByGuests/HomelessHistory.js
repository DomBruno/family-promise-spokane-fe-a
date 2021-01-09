/*
Homeless history.
This component contains:
  -all feilds are inputs
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress } from 'antd';

const HomelessHistory = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  steps,
  step,
}) => {
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //FamilyInfo from ../../intakePacket.jsx (props)
  const { familyInfo } = formData;

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="History" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form layout="vertical">
          <Form.Item label="Last permanent address (last address you lived where you did not consider yourself to be homeless)">
            <Input
              name={'familyInfo.last_permanent_address'}
              value={familyInfo.last_permanent_address}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="Where did you stay last night?">
            <Input
              name={'familyInfo.homeless_info.current_location'}
              value={familyInfo.homeless_info.current_location}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="How long were you at this location?">
            <Input
              name={'familyInfo.homeless_info.length_at_current_location'}
              value={familyInfo.homeless_info.length_at_current_location}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="If less than 7 nights, where did you stay immediately prior to that?">
            <Input
              name={'familyInfo.homeless_info.prior_location'}
              value={familyInfo.homeless_info.prior_location}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="How long were you at this location?">
            <Input
              name={'familyInfo.homeless_info.length_at_prior_location'}
              value={familyInfo.homeless_info.length_at_prior_location}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="Aprroximately when did you become homeless?">
            <Input
              name={'familyInfo.homeless_info.homeless_start_date'}
              value={familyInfo.homeless_info.homeless_start_date}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="How many times in the last 3 years have you been homeless?">
            <Input
              name={'familyInfo.homeless_info.num_times_homeless'}
              value={familyInfo.homeless_info.num_times_homeless}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="How many total months in those 3 years have you been homeless?">
            <Input
              name={'familyInfo.homeless_info.total_len_homeless'}
              value={familyInfo.homeless_info.total_len_homeless}
              onChange={setForm}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HomelessHistory;
