import client from "./client";

const getAllElder = async () => {
    const query = '*[_type =="elder"]';
    return await client.fetch(query).then((elders) => {
        return elders;
    })
}

export default getAllElder;