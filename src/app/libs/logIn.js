import dummyData from './dummyData.json'; // Pretend database

/**
 * Search the database for a record's phone number that match the user enter number. 
 * If found, update localstorage (app state) with the single data object and send a true boolean.
 * Else, send a false boolean.
 */
const getElder = (phoneNumber) => {
    let foundIndex = dummyData.findIndex((data) => {
        return data.phoneNumber === phoneNumber;
    })

    if(foundIndex !== -1) {
        localStorage.setItem("Elder-data", JSON.stringify(dummyData[foundIndex]));
        return true;
    }else {
        return false;
    }
}

export {getElder}