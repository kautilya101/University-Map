const db = require('../db/db')
const path = require('path');
const CSVToJSON = require("csvtojson");


function filePath(fileUrl){
    return path.resolve(__dirname,fileUrl)
}
async function getAllData(){
    try {
        // let users = await CSVToJSON().fromFile(filePath('../db/uniData.csv') );
        let users = await db.getinstnms();
        return users;
      } catch (err) {
        console.log(err);
      }

}

async function getCourseData(){
    try{
        let courses = db.getAllcourses();
        return courses;
    }
    catch(err){
        console.log(err);
    }
}

async function getType(){
    try{
        let courses = db.getAllType();
        return courses;
    }
    catch(err){
        console.log(err);
    }
}

async function getunis(control,course){
    try{
        let unis =  await db.getunis(control,course);
        console.log(unis);
        return unis;
    }
    catch(err){
        console.log(err);
    }

}
async function getinstData(instnm){
    try{
        let unis =  await db.getinstData(instnm);
        return unis;
    }
    catch(err){
        console.log(err);
    }

}

module.exports = {
    getAllData,
    getCourseData,
    getType,
    getunis,
    getinstData
}




