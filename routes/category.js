const express = require('express');

const categoryController = require("../controllers/categoryController");

const router = express.Router();


//Get all categories 
router.get('/all', categoryController.getAll);


//create categories
router.post('/create', categoryController.create);

//update categories
router.put('/update/:id', categoryController.update);

//delete category
router.delete('/delete/:id', categoryController.delete);


module.exports = router;