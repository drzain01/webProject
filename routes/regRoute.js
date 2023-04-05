const express = require('express');
const router = express.Router()
const registeredService = require('../Controllers/RegController.js');

// CREATE registered user
router.post('/', (req,res)=>{
    registeredService.create(req,res)
});

module.exports = router;
