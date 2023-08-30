import writeClient from "./writeClient";

const createElder = async (elder) => {
    writeClient.createOrReplace(elder).then((response) => {
        console.log("Elder created:", response)
    })
    .catch ((err) => {
        console.error("failure: ", err);
    })
}

export default createElder;