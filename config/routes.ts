const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.controller')
const battlesController = require('../controllers/battles.controller')

//users
router.post('/users/new', usersController.create)
router.get('/users/ranking', usersController.getUsersRanking)
router.patch('/users/update/settings', usersController.updateSettings)

//battles
router.get('/battles/user', battlesController.getUserBattles)
router.post('/battles/attack', battlesController.sendAttack)

module.exports = router
