/*
Contact information.
This component contains:
  -Parents/Adults name (input)
  -Parents/Adults number (input)
  -Emergancy contact name (input)
  -Emergancy contact number (input)
Suggestions:
  -Implement an automatic formatter for phone numbers (me) 
    --here is an example: https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Space, Card, Progress } from 'antd';

import Checkbox from 'antd/lib/checkbox/Checkbox';

const ContactInfo = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  step,
  steps,
}) => {
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  const { familyInfo } = formData;

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Contact Info" bordered={false}>
        <Form layout="vertical" name="control-hooks" span={18}>
          <IntakeButton navigation={navigation} />

          <h3>Please included both adults personal phone numbers:</h3>

          <Space style={{ display: 'flex' }}>
            <Form.Item>
              <Input
                placeholder="Full Name"
                name="familyInfo.phone_one.name"
                value={familyInfo.phone_one.name}
                onChange={setForm}
              ></Input>
            </Form.Item>

            <Form.Item>
              <Input
                placeholder="Number"
                name="familyInfo.phone_one.number"
                value={familyInfo.phone_one.number}
                onChange={setForm}
              ></Input>
            </Form.Item>
          </Space>

          <Form.Item>
            <Checkbox
              name="familyInfo.phone_one.safeToLeaveMssg"
              onChange={setForm}
              checked={familyInfo.phone_one.safeToLeaveMssg}
            >
              Safe to leave message
            </Checkbox>
          </Form.Item>

          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item>
              <Input
                placeholder="Full Name"
                name="familyInfo.phone_two.name"
                value={familyInfo.phone_two.name}
                onChange={setForm}
              ></Input>
            </Form.Item>

            <Form.Item>
              <Input
                placeholder="Number"
                name="familyInfo.phone_two.number"
                value={familyInfo.phone_two.number}
                onChange={setForm}
              ></Input>
            </Form.Item>
          </Space>

          <Form.Item>
            <Checkbox
              name="familyInfo.phone_two.safeToLeaveMssg"
              onChange={setForm}
              checked={familyInfo.phone_two.safeToLeaveMssg}
            >
              Safe to leave message
            </Checkbox>
          </Form.Item>

          <h3>Emergency Contact</h3>

          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item>
              <Input
                placeholder="Full Name"
                name="familyInfo.emergencyContact.name"
                value={familyInfo.emergencyContact.name}
                onChange={setForm}
              ></Input>
            </Form.Item>

            <Form.Item>
              <Input
                placeholder="Number"
                name="familyInfo.emergencyContact.number"
                value={familyInfo.emergencyContact.number}
                onChange={setForm}
              ></Input>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default ContactInfo;
