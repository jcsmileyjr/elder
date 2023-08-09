import dummyData from './dummyData.json';
/**
 * Search the database for a record's phone number that match the user enter number. 
 * If found, update localstorage (app state) with the single data object and send a true boolean.
 * Else, send a false boolean.
 */
const getElder = (phoneNumber) => {
    let parseData;

    // Check if the test data is already saved. If not, save it. If so, use it.
    let previousTestData = localStorage.getItem("Elder-test-data");
    if (previousTestData === null) {
      localStorage.setItem("Elder-test-data", JSON.stringify(dummyData)); // TODO: Swap with a real database call
      parseData = dummyData;
    } else {
        let previousSavedData = localStorage.getItem("Elder-test-data"); // TODO: Swap with a real database call
        parseData = JSON.parse(previousSavedData)
    }

    let foundIndex = parseData.findIndex((data) => {
        return data.phoneNumber === phoneNumber;
    })

    if(foundIndex !== -1) {
        localStorage.setItem("Elder-data", JSON.stringify(parseData[foundIndex]));
        return true;
    }else {
        return false;
    }
}

export {getElder}