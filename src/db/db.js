require("dotenv").config();
const postgres = require('postgres');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const URL = `postgres://kbhardwaj:Mhwuq7sc6CAb@ep-spring-lab-667624.ap-southeast-1.aws.neon.tech/neondb`

const pool = postgres(URL, { ssl: 'require' });

async function getPostgresVersion() {
  const result = await pool`select instnm from insts;`;
  console.log(result);
}

getPostgresVersion();

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '#12kautilya',
//   port: 4321,
// })

const getval = `select count(creddesc),creddesc,instnm from university group by instnm,creddesc;`
const getCourse = `SELECT DISTINCT CREDDESC FROM university;`
const getType = `SELECT DISTINCT CONTROL FROM university;`


async function getinstnms(){
  try {
    const res = await pool`SELECT INSTNM FROM INSTS ORDER BY INSTNM;`
    return res;
  } catch (err) {
    return console.log(err);
  }
}

async function getAllcourses() {
  try {
    const res = await pool`getCourse`;
    return res ;
  } catch (err) {
    return console.log(err);
  }
}

async function getAllType() {
  try {
    const res = await pool`getType`;
    return res ;
  } catch (err) {
    return console.log(err);
  }
}


async function getunis(control,course){

  if(control != 'None' && course != 'None'){
    try {
      const res2 = await pool`SELECT DISTINCT INSTNM FROM university WHERE CREDDESC = ${course} AND CONTROL = ${control};`
      return res2 ;
    } catch (err) {
      return console.log(err);
    }
  }
  else if(control == 'None'){
    try {
      const res = await pool`SELECT DISTINCT INSTNM FROM university WHERE CREDDESC = ${course};`
      return res ;
    } catch (err) {
      return console.log(err);
    }
  }
  else{
    try {
      const res_1 = await pool`SELECT DISTINCT INSTNM FROM university WHERE CONTROL = ${control};`
      return res_1 ;
    } catch (err_1) {
      return console.log(err_1);
    }
  }
}


async function getinstData(instnm){
  try {
    const res = await pool`'SELECT DISTINCT CREDDESC FROM university WHERE INSTNM = $1', [instnm]`;
    return res ;
  } catch (err) {
    return console.log(err);
  }
}


module.exports = {
  getAllcourses,
  getAllType,
  getunis,
  getinstData,
  getinstnms
}