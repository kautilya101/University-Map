const mainService = require('../services/main.services');

const getAllData = async( req, res) =>{
    try{
        const data = await mainService.getAllData();
        res.send(data);
    }
    catch(err){
        console.log(`Error in controller - ${err}`)
    }
}

const getAllUniversities = async(req,res) => {
    try{
        const data = await mainService.getAllUniversities();
        res.send(data);
    }
    catch(err){
        console.log(`Error controller in universities - ${err}`)
    }
}

const getAllUniversitiesData = async(req,res) => {
    try{
        const data = await mainService.getAllUniversitiesData();
        let newobj = {};
        
        res.send(data);
    }
    catch(err){
        console.log(`Error controller in universities - ${err}`)
    }
}


const getCourseData = async (req,res) =>{
    try{
        const data = await mainService.getCourseData();
        res.send(data);
    }
    catch(err){
        console.log(`Error controller in universities - ${err}`)
    }
}


const getTypeData = async (req,res) =>{
    try{
        const data = await mainService.getTypeData();
        res.send(data);
    }
    catch(err){
        console.log(`Error controller in universities - ${err}`)
    }
}

const getunis = async(req,res) => {
    try{
        const {control,course} = req.query;
        console.log(control,course);
        const data = await mainService.getunis(control,course);
        res.send(data);
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
    getTypeData,
    getunis
}