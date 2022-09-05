const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const battlesController = require('../controllers/battles.controller');
const authMiddleware = require ('../middlewares/auth.middleware');

//users
router.post('/users/new', authMiddleware.isNotAuthenticated, usersController.create);
router.get('/users/ranking', authMiddleware.isAuthenticated, usersController.getUsersRanking);
router.patch('/users/update/settings',authMiddleware.isAuthenticated, usersController.updateSettings);

//battles
router.get('/battles/history', authMiddleware.isAuthenticated, battlesController.getUserBattles);
router.post('/battles/attack', authMiddleware.isAuthenticated, battlesController.sendAttack);

//sessions
router.post('/login', authMiddleware.isNotAuthenticated, usersController.login);
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout);

module.exports = router;
