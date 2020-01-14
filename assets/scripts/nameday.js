/**
 * International Nameday API
 */

// name
const getNamedayByName = async (name) => {
    const response = await fetch(`https://api.abalin.net/getdate?name=${name}&country=se`);
    const data = await response.json();
    return data;
};


// date
const getNamedayByDate = async (month, day) => {
    const response = await fetch(`https://api.abalin.net/namedays?country=se&month=${month}&day=${day}`);
    const data = await response.json();
    return data;
};