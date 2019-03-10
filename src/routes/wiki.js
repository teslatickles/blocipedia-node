const express = require('express');
const router = express.Router();

const wikiController = require('../controllers/wikiController');

router.get("/wiki", wikiController.index);
router.post("/wiki/create", wikiController.create);

module.exports = router;