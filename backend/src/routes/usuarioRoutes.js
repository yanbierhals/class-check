const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', authMiddleware, usuarioController.getMe);
router.put('/me', authMiddleware, usuarioController.updateMe);
router.delete('/me', authMiddleware, usuarioController.deleteMe);

module.exports = router;