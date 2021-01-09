/*
Main IntakePacket component.
This component contains:
  -switch statement to navigate through the intake form
  -data structure for familyInfo(defaultData)
*/

import React, { useState } from 'react';
import { useForm, useStep } from 'react-hooks-helper';

//Intake packet page components
import ContactInfo from './IntakePacketContent/ByGuests/ContactInfo';
import FamilyMembers from './IntakePacketContent/ByGuests/FamilyMembers';
import RaceEthnicityInfo from './IntakePacketContent/ByGuests/RaceEthnicityInfo';
import BarriersPage from './IntakePacketContent/ByGuests/BarriersPage';
import ChildSchoolInfo from './IntakePacketContent/ByGuests/ChildSchoolInfo';
import DomesticViolence from './IntakePacketContent/ByGuests/DomesticViolence';
import HomelessHistory from './IntakePacketContent/ByGuests/HomelessHistory';
import Insurance from './IntakePacketContent/ByGuests/Insurance';
import FamilyDemographics from './IntakePacketContent/ByGuests/FamilyDemographics';
import AdditionalInfo from './IntakePacketContent/ByGuests/AdditionalInfo';
import IntakeStart from './IntakePacketContent/IntakeStart';
import CreateOktaAccountForm from './IntakePacketContent/createOktaAccountForm/CreateOktaAccountForm';

/* Data structure for familyInfo. Each familyMember is pushed to the familyMember array here but 
the data structure is in ./IntakePacketContent/ByGuests/FamilyMembers.js*/

let defaultData = {
  familyInfo: {
    user_id: null,
    case_number: 1234,
    phone_one: {
      name: 'Mary Jane',
      number: '111222333',
      safeToLeaveMssg: true,
    },
    phone_two: {
      name: 'Peter Parker',
      number: '111222333',
      safeToLeaveMssg: false,
    },
    emergencyContact: {
      name: '',
      number: '111222333',
    },
    vehicle: {
      make: 'Honda',
      year: '1990',
      color: 'black',
      model: 'x',
      license_plate: '1123',
    },
    last_permanent_address: '3211 East Ave',
    homeless_info: {
      prior_location: '3211 East Ave',
      current_location: 'nowhere',
      num_times_homeless: 5,
      total_len_homeless: '3 months',
      homeless_start_date: '3/5/2018',
      length_at_prior_location: '2 years',
      length_at_current_location: '1 year',
    },
    gov_benefits: {
      RRH: null,
      snap: null,
      cps_fps: null,
      foodstamps: null,
      housing_voucher: null,
      veteran_services: null,
    },
    insurance: {
      pregnancies: {
        is_pregnant: null,
        if_yes_who: null,
        due_date: null,
      },
      has_insurance: true,
      members_covered: 2,
      health_insurance_type: 'medicaid',
    },
    domestic_violence_info: {
      fleeing_dv: false,
      YWCA_contacted: null,
      has_court_order: null,
      date_last_incident: null,
      anonymity_preferred: null,
    },
    avatar_url: null,
    pets: 1,
    percent_complete: 0,
  },
  familyMember: {},
};

// Navigation path for intake form. Each name coresponds with the switch statement id.
const steps = [
  { id: 'IntakeStart' },
  { id: 'ContactInfo' },
  { id: 'FamilyMembers' },
  { id: 'FamilyDemographics' },
  { id: 'RaceEthnicityInfo' },
  { id: 'BarriersPage' },
  { id: 'ChildSchoolInfo' },
  { id: 'DomesticViolence' },
  { id: 'HomelessHistory' },
  { id: 'Insurance' },
  { id: 'AdditionalInfo' },
];

const IntakePacket = () => {
  //count is used to track each family member(do not POST count)
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [formData, setForm] = useForm(defaultData);

  //useStep sets intial step with steps[initialStep]
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  //useForm resolves before template literals. This function fixes that.
  const nameString = (n, location) => `familyMember.${n}.${location}`;

  //Inline styling for form container
  const tempFormStyle = {
    marginLeft: '20%',
    marginTop: '50px',
    maxWidth: '900px',
  };

  const props = {
    navigation,
    formData,
    setForm,
    tempFormStyle,
    count,
    setCount,
    nameString,
    userId,
    steps,
    step,
  };

  if (!userId) {
    return <CreateOktaAccountForm setUserId={setUserId} />;
  }
  formData.familyInfo.user_id = userId;

  //Returns component based on useStep hook step.
  switch (id) {
    case 'IntakeStart':
      return <IntakeStart {...props} />;
    case 'ContactInfo':
      return <ContactInfo {...props} />;
    case 'FamilyMembers':
      return <FamilyMembers {...props} />;
    case 'FamilyDemographics':
      return <FamilyDemographics {...props} />;
    case 'RaceEthnicityInfo':
      return <RaceEthnicityInfo {...props} />;
    case 'BarriersPage':
      return <BarriersPage {...props} />;
    case 'ChildSchoolInfo':
      return <ChildSchoolInfo {...props} />;
    case 'DomesticViolence':
      return <DomesticViolence {...props} />;
    case 'HomelessHistory':
      return <HomelessHistory {...props} />;
    case 'Insurance':
      return <Insurance {...props} />;
    case 'AdditionalInfo':
      return <AdditionalInfo {...props} />;
    default:
      return null;
  }
};

export default IntakePacket;
