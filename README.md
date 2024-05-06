# replacer

A very simple project to batch replace the contents of files by a list of variables

## Command to execute
**replacer.exe** [-templates="d:\templates"] [-results="d:\results"] [var="replacer.txt"]<br>
- templates - directory with templates<br>
- results   - directory with results<br>
- var       - file with variable`s list<br>

## Replacer.txt
#Model#  = Definition<br>
#model#  = definition<br>
#models# = definitions<br>
#Models# = Definitions<br>

## An example of a template #models#.route.js
const express = require('express');<br>
const #models#Controller = require('../controllers/#models#.controller');<br>
const commonController = require('../controllers/common.controller');<br>
const router = express.Router();<br>
router.get('/', #models#Controller.get#Models#);<br>
router.post('/', #models#Controller.create#Model#);<br>
router.patch('/', commonController.sendMethodNotAllowed);<br>
router.delete('/', commonController.sendMethodNotAllowed);<br>
module.exports = router;<br>

## An example of a result file definitions.route.js
const express = require('express');<br>
const definitionsController = require('../controllers/definitions.controller');<br>
const commonController = require('../controllers/common.controller');<br>
const router = express.Router();<br>
router.get('/', definitionsController.getDefinitions);<br>
router.post('/', definitionsController.createDefinition);<br>
router.patch('/', commonController.sendMethodNotAllowed);<br>
router.delete('/', commonController.sendMethodNotAllowed);<br>
module.exports = router;<br>