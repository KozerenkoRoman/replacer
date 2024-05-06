# replacer

A very simple project to batch replace the contents of files by a list of variables

## Command to execute
replacer.exe [-templates="d:\templates"] [-results="d:\results"] [var="replacer.txt"]
templates - directory with templates
results   - directory with results
var       - file with variable`s list

## Replacer.txt
#Model#  = Definition
#model#  = definition
#models# = definitions
#Models# = Definitions

## An example of a template #models#.route.js
const express = require('express');
const #models#Controller = require('../controllers/#models#.controller');
const commonController = require('../controllers/common.controller');
const router = express.Router();
router.get('/', #models#Controller.get#Models#);
router.post('/', #models#Controller.create#Model#);
router.patch('/', commonController.sendMethodNotAllowed);
router.delete('/', commonController.sendMethodNotAllowed);
module.exports = router;

## An example of a result file definitions.route.js
const express = require('express');
const definitionsController = require('../controllers/definitions.controller');
const commonController = require('../controllers/common.controller');
const router = express.Router();
router.get('/', definitionsController.getDefinitions);
router.post('/', definitionsController.createDefinition);
router.patch('/', commonController.sendMethodNotAllowed);
router.delete('/', commonController.sendMethodNotAllowed);
module.exports = router;
