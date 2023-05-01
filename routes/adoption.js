const express = require("express");
const adoptionController = require("../controllers/adoptionController");
const { route } = require("./category");

const router = express.Router();

router.post('/create', adoptionController.create);

router.put('/update/:id', adoptionController.update);

router.get('/get', adoptionController.getAll);

router.get('/get/:id', adoptionController.getOne);

router.delete('/delete/:id', adoptionController.delete);

module.exports = router;