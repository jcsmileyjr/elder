import dummyData from './dummyData.json';

/**
 * Takes a 10 digit phone number and compare array of elder objects phone number property to ensure its not a duplicate.
 * @param {string} phoneNumber 
 * @returns true or false
 */
const ifDuplicatePhoneNumber = (phoneNumber) => {
    let parseData; // varible to hold the pretend database inital data

    // Check if the test data is already saved. If not, save it. If so, use it.
    let previousTestData = localStorage.getItem("Elder-test-data");
    if (previousTestData === null) {
      localStorage.setItem("Elder-test-data", JSON.stringify(dummyData));
      parseData = dummyData;
    } else {
      parseData = JSON.parse(previousTestData);
    }

    // Check if the phone number is already being used by an object in the array of elders
    let foundIndex = parseData.findIndex((data) => {
        return data.phoneNumber === phoneNumber;
    });

    // If the number isn't found, return false. If found, return true
    if(foundIndex === -1) {
        return false;
    } else {
        return true;
    }
}

export { ifDuplicatePhoneNumber }

