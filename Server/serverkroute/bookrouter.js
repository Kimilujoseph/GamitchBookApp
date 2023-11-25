const express = require('express');
const route = express.Router();

const bookcontroller = require('../severcontroller/bookcontroller')
route.get('/',bookcontroller.homepage)


module.exports = route;