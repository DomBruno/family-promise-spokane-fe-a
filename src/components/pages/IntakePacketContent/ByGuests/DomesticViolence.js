/*
Domestic violence information.
This component contains:
  -currently fleeing a DV situation (checkbox)
  -HMIS anonymously (checkbox)
  -Court Order in place (checkbox)
  -Contacted the YWCA (checkbox)
  -Date of most recent DV incident (input)
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Checkbox, Card, Progress } from 'antd';

const DomesticViolence = ({
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

      <Card title="Domestic Violence" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form layout="vertical">
          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.fleeing_dv"
              defaultChecked={familyInfo.domestic_violence_info.fleeing_dv}
              onChange={setForm}
            >
              Are you currently fleeing a DV situation?
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.anonymity_preferred"
              defaultChecked={
                familyInfo.domestic_violence_info.anonymity_preferred
              }
              onChange={setForm}
            >
              If so do you wish to be entered in HMIS anonymously?
            </Checkbox>
          </Form.Item>

          <Form.Item label="Date of most recent DV incident">
            <Input
              name="familyInfo.domestic_violence_info.date_last_incident"
              value={familyInfo.domestic_violence_info.date_last_incident}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.has_court_order"
              defaultChecked={familyInfo.domestic_violence_info.has_court_order}
              onChange={setForm}
            >
              Is there a No Contact or any other Court Order in place?
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.YWCA_contacted"
              defaultChecked={familyInfo.domestic_violence_info.YWCA_contacted}
              onChange={setForm}
            >
              If you are fleeing DV, have you contacted the YWCA?
            </Checkbox>
          </Form.Item>

          <p>
            If not, please ask supervisor for the YWCA phone number to call.
          </p>
          <p style={{ maxWidth: '800px' }}>
            If you wish to be anonymous AND you have registered with the HFCA,
            we will need your HMIS # - This number is assigned to you by the
            HFCA - if you have not registered with the HFCA we can assign you an
            anonymous HMIS.
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default DomesticViolence;
