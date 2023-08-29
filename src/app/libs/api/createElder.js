import writeClient from "./writeClient";

const createElder = async (elder) => {
    if(process.env.NODE_ENV === 'development') {
        console.log("DEV permissions: ", process.env.NODE_ENV)
    }else {
        console.log("PROD permissions: ", process.env.NODE_ENV)
    }

    writeClient.createOrReplace(elder).then((response) => {
        console.log("Elder created:", response)
    })
}

export default createElder;