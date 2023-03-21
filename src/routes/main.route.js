const express = require('express')
const { getAllData, getAllUniversities, getAllUniversitiesData, getCourseData, getTypeData, getunis } = require('../controllers/main.controller');

const router = express.Router()
router.get('/data/',getAllData);
router.get('/data/unis',getAllUniversities);
router.get('/data/unisdata',getCourseData);
router.get('/data/unistype',getTypeData)
router.get('/data/unisfiltered',getunis)


module.exports = router