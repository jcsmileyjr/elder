import client from "./client";

const createElder = async (elder) => {
    client.createOrReplace(elder).then((response) => {
        console.log("Elder created:", response)
    })
}

export default createElder;