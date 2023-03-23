const mainRepo = require("../respos/main.repos")

let unisName = [];


const getAllData = async () =>{
    const response = await mainRepo.getAllData();
    return response;
}

const getAllUniversities = async () => { 
    const response = await mainRepo.getAllData();
    return response;
}

const getCourseData = async() => {
    const response = await mainRepo.getCourseData();
    return response;
}

const getTypeData = async() => {
    const response = await mainRepo.getType();
    return response;
}

const getunis = async(control,course) => {
    try{
        const data = await mainRepo.getunis(control,course);
        console.log(control,course);
        return data;
    }
    catch(err){
        console.log(`Error fetching filtered universities - ${err}`)
    }
}


const getinstData = async(instnm) => {
    try{
        const data = await mainRepo.getinstData(instnm);
        return data;
    }
    catch(err){
        console.log(`Error fetching filtered universities - ${err}`)
    }
}

module.exports = {
    getAllData,
    getAllUniversities,
    getCourseData,
    getTypeData,
    getunis,
    getinstData
}