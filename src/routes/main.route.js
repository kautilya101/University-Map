const express = require('express')
const { getAllData, getAllUniversities, getCourseData, getTypeData, getunis, getinstData } = require('../controllers/main.controller');

const router = express.Router()
router.get('/data/unis',getAllUniversities);
router.get('/data/unisdata',getCourseData);
router.get('/data/unistype',getTypeData)
router.get('/data/unisfiltered',getunis)
router.get('/data/instnmData',getinstData);


module.exports = router