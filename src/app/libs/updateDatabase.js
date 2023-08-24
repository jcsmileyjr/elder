import getAllElder from "./api/getElder";
import createElder from "./api/createElder";
import {v4 as uuidv4} from 'uuid'; // NPM module that creates a random ID number

/**
 * Function to update the database with a new elder or updated elder
 * @param {object} newElder 
 */
const updateDatabase = async (newElder) => {
  let parseData = await getAllElder();

  // Check if the phone number of the newElder is already being used by an object in the array of elders
  let foundIndex = parseData.findIndex((exsistingElder) => {
    return exsistingElder.phoneNumber === newElder.phoneNumber;
  });

  // if an exsisting elder with the phone number is found, then swap the new elder info with the old elder info in the pretend database
  if (foundIndex !== -1) {
    createElder(newElder);
  } else {
    // if not found, then add the elder object to the pretend database
    newElder._id = uuidv4(); // new random ID
    createElder(newElder);
  }
};

export { updateDatabase };
