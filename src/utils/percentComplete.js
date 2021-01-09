// This file takes a household object and returns an array [percent, [incomplete stuff]]
// example household object can be viewed by making a GET request to http://localhost:8000/families/{family_id}/household
// right at the end of labs we noticed a bug causing duplicates everytime there the refresh button is clicked on the analytics tab of the guest dashboard
// I looked into using underscore.js to implement this functionality and will be working on this in my fork of this project -leslie r (thereactgirl)

// array to hold all values
const allValues = [];

// array to hold all incomplete values
const incompleteFields = [];

// counter to hold null count
let nullCount = 0;

// get all the values from the any object using recursions
function getAllValues(data) {
  // if data is object recurse to get those values
  if (typeof data === 'object') {
    for (const key in data) {
      getAllValues(data[key]);
    }
    // count each null value
    for (const key in data) {
      if (data[key] === null || data[key] === undefined) {
        nullCount += 1;
        // if incomplete value is found push to array to return
        incompleteFields.push(key);
      }
    }
  }
  // all values get pushed this to this array which is used to get the total
  allValues.push(data);
}

// helper function to calculate percentage
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

// function that actually returns an array  [percent complete, [incomplete values]]

// pass in household object
export function returnPercentComplete(data) {
  // get an array of all complete values
  getAllValues(data);
  // get total number of household values needed
  const total = allValues.length;

  // subtract nullCount from allValues.length and get number of complete values
  const totalComplete = total - nullCount;

  // calculate a percentage
  const percent_complete = percentage(totalComplete, total);

  // return a percentage and all values that still need to be complete
  return [Math.round(percent_complete), incompleteFields];
}
