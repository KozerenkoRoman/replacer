const express = require('express');
const #models#Controller = require('../controllers/#models#.controller');
const commonController = require('../controllers/common.controller');

const router = express.Router();
router.get('/', #models#Controller.get#Models#);
router.post('/', #models#Controller.create#Model#);
router.patch('/', commonController.sendMethodNotAllowed);
router.delete('/', commonController.sendMethodNotAllowed);

router.get('/:id', #models#Controller.get#Model#ById);
router.post('/:id', commonController.sendMethodNotAllowed);
router.patch('/:id', #models#Controller.patch#Model#);
router.delete('/:id', #models#Controller.delete#Model#);

module.exports = router;