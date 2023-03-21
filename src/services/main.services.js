const mainRepo = require("../respos/main.repos")

let unisName = [];


const getAllData = async () =>{
    const response = await mainRepo.getAllData();
    return response;
}

const getAllUniversities = async () => { 
    const response = await mainRepo.getAllData();
    for(item in response){
        let name = response[item].INSTNM;
        if(!(unisName.includes(name))){
            unisName.push(name);
        }
    }
    return JSON.stringify(unisName);
    
}

const getAllUniversitiesData = async() => {
    const response = await mainRepo.getAllData();

    let newobj = {};
    for(let item in response){
        newobj[response[item].INSTNM].push(response[item].CREDDESC);
    }
    // console.log(newobj);
    return newobj;
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
        return data;
    }
    catch(err){
        console.log(`Error fetching filtered universities - ${err}`)
    }
}

module.exports = {
    getAllData,
    getAllUniversities,
    getAllUniversitiesData,
    getCourseData,
    getTypeData,getunis
}