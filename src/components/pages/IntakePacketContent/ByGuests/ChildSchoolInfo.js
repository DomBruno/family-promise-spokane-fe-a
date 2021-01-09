/*
School information for EACH CHILD.
This component contains:
  -Grade (drop down)
  -Atendence Status (drop down)
  -School type (drop down)
  -School name (input)
  -Currently enrolled (checkbox)
  -Connected to mcKinnely? (checkbox)
  -Reason for not attending school (input)
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import {
  Form,
  Input,
  Space,
  Select,
  Checkbox,
  Card,
  Progress,
  Divider,
} from 'antd';

const ChildSchoolInfo = ({
  navigation,
  tempFormStyle,
  setForm,
  formData,
  nameString,
  steps,
  step,
}) => {
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  const { familyMember } = formData;

  const { TextArea } = Input;

  //Options for school grade levels
  const gradeOptions = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  //Options for attendence status
  const attendStatOptions = [
    'Regular',
    'Irregular',
    'Dropped out',
    'Suspended',
    'Expelled',
  ];

  //Options for school types
  const schoolTypeOptions = ['Public', 'Private'];

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. 

  Unable make keys dynamic in spread (currently not DRY code)
  You must create a new function for each input feild or make keys dynamic.
  */
  const setFormAttend = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      schools: { ...familyMember[mem].schools, attendance_status: value },
    });
  };
  const setFormType = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      schools: { ...familyMember[mem].schools, school_type: value },
    });
  };
  const setFormGrade = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      schools: { ...familyMember[mem].schools, highest_grade_completed: value },
    });
  };

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="School Verification (Children)" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form layout="vertical">
          {/*Displays family member with "Child" relationship currently in formData */}
          {Object.keys(formData.familyMember).map((mem, key) => (
            <>
              {familyMember[mem].demographics.relationship != 'Child' ? null : (
                <>
                  <Divider orientation="left" plain>
                    {familyMember[mem].demographics.first_name}
                  </Divider>

                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      label="Highest Grade Completed"
                      style={{ width: '200px' }}
                    >
                      <Select
                        placeholder="Please select an option"
                        defaultValue={
                          familyMember[mem].schools.highest_grade_completed
                        }
                        onChange={setFormGrade(mem)}
                      >
                        {gradeOptions.map(grade => (
                          <option value={grade}>{grade}</option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Attendence Status"
                      style={{ width: '200px' }}
                    >
                      <Select
                        defaultValue={
                          familyMember[mem].schools.attendance_status
                        }
                        onChange={setFormAttend(mem)}
                        placeholder="Please select an option"
                      >
                        {attendStatOptions.map(op => (
                          <option value={op}>{op}</option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="School Type" style={{ width: '200px' }}>
                      <Select
                        placeholder="Please select an option"
                        defaultValue={familyMember[mem].schools.school_type}
                        onChange={setFormType(mem)}
                      >
                        {schoolTypeOptions.map(op => (
                          <option value={op}>{op}</option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="School Name" style={{ width: '200px' }}>
                      <Input
                        placeholder="ex. Soap Lake MSHS"
                        name={nameString(mem, 'schools.school_name')}
                        value={familyMember[mem].schools.school_name}
                        onChange={setForm}
                      />
                    </Form.Item>
                  </Space>

                  <Form.Item label="Currently Enrolled?">
                    <Checkbox
                      name={nameString(mem, 'schools.enrolled_status')}
                      defaultChecked={familyMember[mem].schools.enrolled_status}
                      onChange={setForm}
                    />
                  </Form.Item>

                  <Form.Item label="Connected w/ McKinney-Vento School">
                    <Checkbox
                      name={nameString(mem, 'schools.mckinney_school')}
                      defaultChecked={familyMember[mem].schools.mckinney_school}
                      onChange={setForm}
                    />
                  </Form.Item>

                  <Form.Item label="IF YOUR CHILD(REN) IS/ARE NOT ENROLLED IN SCHOOL AT THIS TIME PLEASE INDICATE THE REASON WHY BELOW">
                    <TextArea
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      name={nameString(mem, 'schools.reason_not_enrolled')}
                      onChange={setForm}
                      value={familyMember[mem].schools.reason_not_enrolled}
                    />
                  </Form.Item>
                </>
              )}
            </>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default ChildSchoolInfo;
