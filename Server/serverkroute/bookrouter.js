const express = require('express');
const route = express.Router();

const bookcontroller = require('../severcontroller/bookcontroller')
route.get('/',bookcontroller.homepage)
route.get('/categories',bookcontroller.categories)
route.get('/morebooks',bookcontroller.morebooks)
route.get('/about/:_id',bookcontroller.descriptionofthebook);
route.get('/categories/:categoryname',bookcontroller.categoryofthebook)

module.exports = route;