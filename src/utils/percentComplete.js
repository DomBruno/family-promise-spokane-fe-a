const family = {
  first_name: 'Joe',
  last_name: 'Clemmons',
  gender: 'male',
  relationship: 'cousin',
  DOB: '10-23-1992',
  SSN: 9999,
  income: 20000,
  employer: 'union',
  race: ['White'],
  ethnicity: 'Caucasian',
  highest_grade_completed: '12th grade',
  enrolled_status: false,
  reason_not_enrolled: 'finished',
  attendance_status: 'inactive',
  school_type: 'null',
  school_name: 'null',
  mckinney_school: false,
  flag_level: 0,
  id: 1,
  family_id: 1,
  date_of_enrollment: '2020-10-09T00:00:00.000Z',
  household_type: 'Adults and Children',
  length_of_stay: '6 weeks',
  demographics: {
    first_name: 'Joe',
    last_name: 'Clemmons',
    gender: 'male',
    relationship: 'cousin',
    DOB: '10-23-1992',
    SSN: 9999,
    income: 20000,
    employer: 'union',
    race: ['White'],
    ethnicity: 'Caucasian',
  },
  barriers: {
    alcohol_abuse: true,
    developmental_disabilities: false,
    chronic_health_issues: false,
    drug_abuse: false,
    HIV_AIDs: false,
    mental_illness: false,
    physical_disabilities: true,
    list_indefinite_conditions: 'null',
    list_issues: 'null',
  },
  schools: {
    highest_grade_completed: '12th grade',
    enrolled_status: false,
    reason_not_enrolled: 'finished',
    attendance_status: 'inactive',
    school_type: 'null',
    school_name: 'null',
    mckinney_school: false,
  },
  case_members: 3,
  predicted_exit_destination: 'permanent exit',
  flag: 'null',
  percent_complete: 0,
  tableData: {
    id: 0,
  },
};

// in effort to keep this percentage dynamic for future code changes this list should be updated with any values that are added that do not need to be calculated for percentage complete
// for example if we ever add message_id or something like that to the families table we dont need to count that value in total percent complete
const valuesToExclude = [
  'id',
  'familiy_id',
  'predicted_exit_destination',
  'flag',
  'percent_complete',
  'table_data',
  // TODO include any values to exclude from members data
];

// array to hold all values
const allValues = [];

// counter to hold null count
let nullCount = 0;

// get all the values from the any object
function getAllValues(data) {
  if (typeof data === 'object') {
    for (const key in data) {
      getAllValues(data[key]);
    }
  } else {
    // NOTE IF ANY VALUE IS TYPE NULL IT WILL THROW OFF THE PERCENTAGE
    // INTAKE FORM SHOULD NOT LEAVE ANY VALUES NULL AND USE "N/A" OR STRING VALUE "NULL" FOR THIS TO WORK CORRECTLY
    // TODO get with frontend to implement this
    if (data === 'null') {
      nullCount += 1;
    }
    // all values get pushed to array even NA or string value of 'null'
    // exception is I couldn't find a way to count actual null types so will get with team to make sure no null types get saved unless they are in a string format or use "NA" or "Incomplete"

    allValues.push(data);
  }
}

//function to calculate percentage
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

// function that returns a percent complete
// pass in data
function returnPercentComplete(data) {
  // get an array of all complete values
  getAllValues(data);

  // get number of complete values
  const total = allValues.length - valuesToExclude.length;

  // subtract nullCount from allValues.length and get number of complete values
  const totalComplete = total - nullCount;

  // calculate a percentage
  const percent_complete = percentage(totalComplete, total);

  console.log('total', total);
  console.log('incomplete', nullCount);
  console.log('complete', totalComplete);

  console.log(percent_complete + '% complete');

  // return a percentage
  return percent_complete;
}

// testing data from above should return 85% because:
// there are 7 null values and 41 complete values in example above
// there are are 53 total values minus values to exclude is 48
// 41 out of 48 is about 85%

returnPercentComplete(family);

export { allValues };
