import getAllElder from "./api/getElder";

/**
 * Takes a 10 digit phone number and compare array of elder objects phone number property to ensure its not a duplicate.
 * @param {string} phoneNumber 
 * @returns true or false
 */
const ifDuplicatePhoneNumber = async (phoneNumber) => {
  let parseData = await getAllElder();

  // Check if the test data is already saved. If not, save it. If so, use it.
  let previousTestData = localStorage.getItem("Elder-test-data");
  if (previousTestData === null) {
    localStorage.setItem("Elder-test-data", JSON.stringify(dummyData));
    parseData = dummyData;
  } else {
    parseData = JSON.parse(previousTestData);
  }

  // If the number isn't found, return false. If found, return true
  if(foundIndex === -1) {
      return false;
  } else {
      return true;
  }
}

export { ifDuplicatePhoneNumber }

