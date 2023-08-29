import readClient from "./readClient";

const getAllElder = async () => {
    const query = '*[_type =="elder"]';
    return await readClient.fetch(query).then((elders) => {
        return elders;
    })
}

export default getAllElder;