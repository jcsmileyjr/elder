import getAllElder from './api/getElder';

/**
 * Do an API call to get all the elder records
 * Search the database for a record's phone number that match the user enter number. 
 * If found, update localstorage (app state) with the single data object and send a true boolean.
 * Else, send a false boolean.
 */
const getElder = async (phoneNumber) => {
    let parseData = await getAllElder();
    let enableLogin = false;
console.log(parseData)
    let foundIndex = parseData.findIndex((data) => {
        return data.phoneNumber === phoneNumber;
    })

    if(foundIndex !== -1) {
        localStorage.setItem("Elder-data", JSON.stringify(parseData[foundIndex]));
        enableLogin =  true;
    }else {
        enableLogin = false;
    }
   
    return enableLogin
}

export {getElder}