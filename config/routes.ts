const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.controller')
const battlesController = require('../controllers/battles.controller')

//users
router.post('/users/new', usersController.create)
router.patch('/users/update/score', usersController.updateScore)
router.patch('/users/update/settings', usersController.updateSettings)
router.get('/users/ranking', usersController.getUserRanking)

//battles
router.post('/battles/attack', battlesController.sendAttack)

module.exports = router
