/*
Domestic violence information.
This component contains:
  -Has insurance? (checkbox)
  -Insurance type (input)
  -Members covered (input)
Sugesstions:
  -Insurance information should be for each family member 
  consider making it apart of family demgraphics (stakeholder)
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Checkbox, Card, Progress } from 'antd';

const Insurance = ({
  navigation,
  tempFormStyle,
  formData,
  setForm,
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

      <Card title="Insurance" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form
          layout="vertical"
          style={{ maxWidth: '800px', alignItems: 'center' }}
        >
          <Form.Item>
            <Checkbox
              name="familyInfo.insurance.has_insurance"
              onChange={setForm}
              defaultChecked={familyInfo.insurance.has_insurance}
            >
              Do you have insurance?
            </Checkbox>
          </Form.Item>

          <Form.Item label="Health insurance source ">
            <Input
              name="familyInfo.insurance.health_insurance_type"
              value={familyInfo.insurance.health_insurance_type}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="Household Members covered">
            <Input
              name="familyInfo.insurance.members_covered"
              value={familyInfo.insurance.members_covered}
              onChange={setForm}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Insurance;
