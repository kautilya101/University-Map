
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

function getAllcourses() {
  return pool.query(getCourse)
                    .then((res) => res.rows)
                    .catch(err => console.log(err))
}

function getAllType() {
  return pool.query(getType)
                    .then((res) => res.rows)
                    .catch(err => console.log(err))
}


function getunis(control,course){
  
  if(control == 'None'){
    return pool.query('SELECT DISTINCT INSTNM FROM university WHERE CREDDESC = $1',[course])
          .then(res => res.rows)
          .catch(err => console.log(err));
  }
  else{
    return pool.query('SELECT DISTINCT INSTNM FROM university WHERE CONTROL = $1',[control])
    .then(res => res.rows)
    .catch(err => console.log(err));
  }
}


module.exports = {
  getAllcourses,
  getAllType,
  getunis
}