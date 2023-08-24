import getAllElder from "./api/getElder";
import createElder from "./api/createElder";
import {v4 as uuidv4} from 'uuid'; // NPM module that creates a random ID number

/**
 * TODO: Swap with a real database call
 * 
 * Function to update the pretend database "Elder-test-data" local storage with a new elder or updated elder
 * @param {object} newElder 
 */
const updateDatabase = async (newElder) => {
  let parseData = await getAllElder();
console.log("all elders in updateDatabase()", parseData)
  // Check if the phone number of the newElder is already being used by an object in the array of elders
  let foundIndex = parseData.findIndex((exsistingElder) => {
    return exsistingElder.phoneNumber === newElder.phoneNumber;
  });

  // if an exsisting elder with the phone number is found, then swap the new elder info with the old elder info in the pretend database
  if (foundIndex !== -1) {
    // const content = parseData.map((elder) => {
    //   if (elder.phoneNumber === newElder.phoneNumber) {
    //     return newElder;
    //   } else {
    //     return elder;
    //   }
    // });
    // localStorage.setItem("Elder-test-data", JSON.stringify(content));
    let elderID = parseData[foundIndex]._id;
    console.log("shiny new leder id: ", elderID);
    newElder._id = elderID;
    console.log("Found updated new elder: ", newElder)
    createElder(newElder);
  } else {
    newElder._id = uuidv4(); // new random ID
    console.log("Shiny new updated new elder: ", newElder)
    // if not found, then add the elder object to the pretend database
    createElder(newElder);
  }
};

export { updateDatabase };
