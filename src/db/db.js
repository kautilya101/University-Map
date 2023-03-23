
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '#12kautilya',
  port: 4321,
})

// const getval = 'select count(creddesc),creddesc,instnm from university group by instnm,creddesc;'
const getCourse = 'SELECT DISTINCT CREDDESC FROM university';
const getType = 'SELECT DISTINCT CONTROL FROM university';


async function getinstnms(){
  try {
    const res = await pool.query('SELECT DISTINCT INSTNM FROM UNIVERSITY ORDER BY INSTNM');
    return res.rows;
  } catch (err) {
    return console.log(err);
  }
}

async function getAllcourses() {
  try {
    const res = await pool.query(getCourse);
    return res.rows;
  } catch (err) {
    return console.log(err);
  }
}

async function getAllType() {
  try {
    const res = await pool.query(getType);
    return res.rows;
  } catch (err) {
    return console.log(err);
  }
}


async function getunis(control,course){

  if(control != 'None' && course != 'None'){
    try {
      const res2 = await pool.query('SELECT DISTINCT INSTNM FROM university WHERE CREDDESC = $1 AND CONTROL = $2', [course,control]);
      return res2.rows;
    } catch (err) {
      return console.log(err);
    }
  }
  else if(control == 'None'){
    try {
      const res = await pool.query('SELECT DISTINCT INSTNM FROM university WHERE CREDDESC = $1', [course]);
      return res.rows;
    } catch (err) {
      return console.log(err);
    }
  }
  else{
    try {
      const res_1 = await pool.query('SELECT DISTINCT INSTNM FROM university WHERE CONTROL = $1', [control]);
      return res_1.rows;
    } catch (err_1) {
      return console.log(err_1);
    }
  }
}


async function getinstData(instnm){
  try {
    const res = await pool.query('SELECT DISTINCT CREDDESC FROM university WHERE INSTNM = $1', [instnm]);
    return res.rows;
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