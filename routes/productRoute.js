const express = require('express');
const router = express.Router()
const ProductController = require('../Controllers/ProductController.js');

// Create new Product
router.post('/', (req,res)=>{

    ProductController.create(req,res)
});
// Get All Product
router.get('/', (req,res)=>{
    ProductController.findAll(req,res)
});

router.get('*', (req,res)=>{
    res.send("Page Not Found!!!");
});

router.post('*', (req,res)=>{
    res.send("Page Not Found!!!");
});

module.exports = router;
