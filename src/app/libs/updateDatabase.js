import dummyData from "./dummyData.json";

/**
 * TODO: Swap with a real database call
 * 
 * Function to update the pretend database "Elder-test-data" local storage with a new elder or updated elder
 * @param {object} newElder 
 */
const updateDatabase = (newElder) => {
  let parseData; // varible to hold the pretend database inital data

  // Check if the test data is already saved. If not, save it. If so, use it.
  let previousTestData = localStorage.getItem("Elder-test-data");
  if (previousTestData === null) {
    localStorage.setItem("Elder-test-data", JSON.stringify(dummyData));
    parseData = dummyData;
  } else {
    let previousSavedData = localStorage.getItem("Elder-test-data");
    parseData = JSON.parse(previousSavedData);
  }

  // Check if the phone number of the newElder is already being used by an object in the array of elders
  let foundIndex = parseData.findIndex((data) => {
    return data.phoneNumber === newElder.phoneNumber;
  });

  // if an exsisting elder with the phone number is found, then swap the new elder info with the old elder info in the pretend database
  if (foundIndex !== -1) {
    const content = parseData.map((elder) => {
      if (elder.phoneNumber === newElder.phoneNumber) {
        return newElder;
      } else {
        return elder;
      }
    });
    localStorage.setItem("Elder-test-data", JSON.stringify(content));
  } else {

    // if not found, then add the elder object to the pretend database
    parseData.push(newElder);
    localStorage.setItem("Elder-test-data", JSON.stringify(parseData));
  }
};

export { updateDatabase };
