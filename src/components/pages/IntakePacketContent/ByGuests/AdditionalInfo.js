/*
General infromation about EACH family member.
This component contains:
  -Vehicle Information(input(s))
  -Goverment Benefits(checkbox(s))
  -Pregnancy Information(checkbox, input(s))
Suggestions:
  -Change options for gov benefits (stakeholder)
*/

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//Ant Design imports (https://ant.design/components/overview/)
import {
  Form,
  Button,
  Card,
  Input,
  Checkbox,
  Row,
  Col,
  Progress,
  Divider,
} from 'antd';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const AdditionalInfo = ({
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

  //FamilyMember Data Structure and FamilyInfo from ../../intakePacket.jsx (props)
  const { familyInfo, familyMember } = formData;

  const { previous } = navigation;
  const history = useHistory();

  //Options for Gov Benifits w/dataBase name counterpart
  const GOVBenifits = [
    'Food Stamps',
    'CPS/FPS (Open case)',
    'RRH (Rapid Rehousing) ',
    'Housing Voucher (Current)',
    'Veteran Services',
    'SNAP assistance',
  ];
  const GOVBenifitsDataName = {
    'Food Stamps': 'foodstamps',
    'CPS/FPS (Open case)': 'cps_fps',
    'RRH (Rapid Rehousing) ': 'RRH',
    'Housing Voucher (Current)': 'housing_voucher',
    'Veteran Services': 'veteran_services',
    'SNAP assistance': 'snap',
  };

  //Options for Vehicle Info w/dataBase name counterpart
  const VehicleInfo = ['Vehicle Make', 'Model', 'Year', 'Color', 'License #'];
  const VehicleInfoDataNames = {
    'Vehicle Make': 'make',
    Model: 'model',
    Year: 'year',
    Color: 'color',
    'Lic #': 'license_plate',
  };

  //useForm resolves before template literals. This function fixes that.
  const familyInfoNameString = (section, value) => {
    return `familyInfo.${section}.${value}`;
  };

  //POSTS family info then posts each member with familyId
  const submitHandlder = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`families`, familyInfo)
      .then(res => {
        const familyId = res.data.families.id;
        Object.keys(formData.familyMember).map(mem => {
          familyMember[mem]['family_id'] = familyId;
          axiosWithAuth()
            .post('members', familyMember[mem])
            .then(res => {
              history.push(`/familyprofile/${familyId}`);
            })
            .catch(err => {
              console.log('MemberError', err.response);
            });
        });
      })
      .catch(err => console.log('FamiliesError', err));
  };

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Additional Information" bordered={false}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          {/*Not using intakeButtons component because of submitHandler*/}
          <Button
            type="primary"
            htmlType="button"
            onClick={previous}
            style={{ width: '100px' }}
          >
            Previous
          </Button>

          <Button
            type="primary"
            style={{
              backgroundColor: 'green',
              border: '1px solid green',
              width: '100px',
            }}
            htmlType="Submit"
            onClick={submitHandlder}
          >
            Submit
          </Button>
        </div>

        <Form layout="vertical">
          <Divider orientation="left" plain>
            Vehicle Information
          </Divider>

          <Form.Item style={{ marginBottom: '40px' }}>
            <Input.Group>
              {VehicleInfo.map((label, key) => (
                <Form.Item label={label} key={key}>
                  <Input
                    name={familyInfoNameString(
                      'vehicle',
                      VehicleInfoDataNames[label]
                    )}
                    value={familyInfo.vehicle[VehicleInfoDataNames[label]]}
                    onChange={setForm}
                  />
                </Form.Item>
              ))}
            </Input.Group>
          </Form.Item>

          <Divider orientation="left" plain>
            Government Benefits
          </Divider>

          <Form.Item label="Please check all that you currently receive:">
            <Row justify={'space-between'} align={'top'}>
              {GOVBenifits.map(benifit => (
                <Col span={4}>
                  <Form.Item
                    label={benifit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      paddingRight: '20px',
                    }}
                  >
                    <Checkbox
                      defaultChecked={
                        familyInfo.gov_benefits[GOVBenifitsDataName[benifit]]
                      }
                      name={familyInfoNameString(
                        'gov_benefits',
                        GOVBenifitsDataName[benifit]
                      )}
                      onChange={setForm}
                    />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Form.Item>

          <Divider orientation="left" plain>
            Pregnancy Information
          </Divider>

          <Form.Item>
            <Checkbox
              style={{ marginBottom: '10px' }}
              name="familyInfo.insurance.pregnancies.is_pregnant"
              onChange={setForm}
              defaultChecked={familyInfo.insurance.pregnancies.is_pregnant}
            >
              Is any one in your household pregnant?
            </Checkbox>

            <Form.Item label="If yes, who?">
              <Input
                name="familyInfo.insurance.pregnancies.if_yes_who"
                value={familyInfo.insurance.pregnancies.if_yes_who}
                onChange={setForm}
              />
            </Form.Item>

            <Form.Item label="When is the due date?">
              <Input
                name="familyInfo.insurance.pregnancies.due_date"
                value={familyInfo.insurance.pregnancies.due_date}
                onChange={setForm}
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdditionalInfo;
