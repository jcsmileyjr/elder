import getAllElder from "./api/getElder";

/**
 * Takes a 10 digit phone number and compare array of elder objects phone number property to ensure its not a duplicate.
 * @param {string} phoneNumber
 * @returns true or false
 */
const ifDuplicatePhoneNumber = async (phoneNumber) => {
  let parseData = await getAllElder();

  // Check if the phone number is already being used by an object in the array of elders
  let foundIndex = parseData.findIndex((data) => {
    return data.phoneNumber === phoneNumber;
  });

  // If the number isn't found, return false. If found, return true
  if (foundIndex === -1) {
    return false;
  } else {
    return true;
  }
};

export { ifDuplicatePhoneNumber };
